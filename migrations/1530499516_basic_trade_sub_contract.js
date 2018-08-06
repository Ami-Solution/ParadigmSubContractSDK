const BasicTradeSubContract = artifacts.require("./BasicTradeSubContract.sol");
const OrderGateway = artifacts.require("./OrderGateway.sol");
const BasicTradeSubContractConfig = require('../configuration/BasicTradeSubContract');

module.exports = function(deployer) {
  deployer.then(async () => {
    const pba = await (await OrderGateway.deployed()).paradigmBank.call();
    const mdt = JSON.stringify(BasicTradeSubContractConfig.makerDataTypes);
    const tdt = JSON.stringify(BasicTradeSubContractConfig.takerDataTypes);
    await deployer.deploy(
      BasicTradeSubContract,
      pba,
      mdt,
      tdt
    );
  });
};