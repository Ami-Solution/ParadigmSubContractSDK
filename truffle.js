var WalletProvider = require("truffle-wallet-provider");

var keystore = require('./keystore.json');
var wallet = require('ethereumjs-wallet').fromV3(keystore, process.env.keystore_password);

module.exports = {
  networks: {
    test: {
      network_id: 50,
      host: 'localhost',
      port: 8545
    },
    staging: {
      network_id: 3,
      gas: 4600000,
      gasPrice: 40000000000,
      provider: new WalletProvider(wallet, "https://ropsten.infura.io")
    }
  }
};
