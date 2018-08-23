const ZeroExSubContract = artifacts.require("./ZeroExSubContract.sol");
const OrderGateway = artifacts.require("./OrderGateway.sol");
const ZeroExSubContractConfig = require('../configuration/ZeroExSubContract');
const ZeroEx = require('0x.js').ZeroEx;

module.exports = function(deployer) {
  deployer.then(async () => {

    let resolve;
    let getNetwork = new Promise((r) => { resolve = r; });
    let networkId = -1;

    web3.version.getNetwork((err, netId) => {
      networkId = parseInt(netId);
      resolve('');
    });

    await Promise.all([getNetwork]);

    const zeroEx = new ZeroEx(web3.currentProvider, { networkId });
    const zeroExExchange = zeroEx.exchange.getContractAddress();
    const zeroExProxy = zeroEx.proxy.getContractAddress();

    await deployer.deploy(
      ZeroExSubContract,
      zeroExExchange,
      zeroExProxy,
      JSON.stringify(ZeroExSubContractConfig.makerArguments),
      JSON.stringify(ZeroExSubContractConfig.takerArguments)
    );//TODO: get address from
  });
};
