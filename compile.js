const path = require('path');   // helps us build a path from current compile.js file to Inbox.sol file, since two diff languages
const fs = require('fs');
const solc = require('solc'); // read in solidity compiler


// __dirname constant defined by node to be current working directory
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// reads in file and encoding for file
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Inbox.sol'
    ].Inbox;

