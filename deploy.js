const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    // paste in account mnemonic
  'that enemy embark cargo elite couple current harsh prefer topple true frost',
    'https://rinkeby.infura.io/v3/fe7747126d174405b3480d489f1dc0fd'
);

// use this to interact with web3 in whatever way we want
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hi there!']})
        .send({ gas: '1000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};

deploy();