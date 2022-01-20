const assert = require('assert');
// serves as local ethereum test network
const ganache = require('ganache-cli');
// uppercase because requires a constructor function to create instances of web3 library
// JS convention is to capitalize constructor functions
const Web3 = require('web3');
// instance of web 3 lowercase, and tells instance to attempt to connect to local network on local machine
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy
    // the contract -- capital C, constructor function, so instance of contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hi there!']})
        .send({ from: accounts[0], gas: '1000000' });

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        // if returns a valid value, test passes
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        // reference the contract ('inbox')
        const message = await inbox.methods.message().call();
        assert(message, 'Hi there!');
    });

    it('can change the message', async () => {
        // take the first account out of accounts and have them pay for test charge
        await inbox.methods.setMessage('bye').send({ from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert(message, 'bye');
    });
})

