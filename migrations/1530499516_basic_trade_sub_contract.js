const BasicTradeSubContract = artifacts.require("./BasicTradeSubContract.sol");
const OrderGateway = artifacts.require("./OrderGateway.sol");
const BasicTradeSubContractConfig = require('../configuration/BasicTradeSubContract');

module.exports = function(deployer) {
  deployer.then(async () => {
    const pba = await (await OrderGateway.deployed()).paradigmBank.call();
    const dt = JSON.stringify(BasicTradeSubContractConfig.dataTypes);
    await deployer.deploy(
      BasicTradeSubContract,
      pba,
      dt
    );
  });
};