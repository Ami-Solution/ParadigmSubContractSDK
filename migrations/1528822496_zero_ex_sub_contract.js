const ZeroExSubContract = artifacts.require("./ZeroExSubContract.sol");
const OrderGateway = artifacts.require("./OrderGateway.sol");
const ZeroExSubContractConfig = require('../configuration/ZeroExSubContract');

module.exports = function(deployer) {
  deployer.then(async () => {
    await deployer.deploy(
      ZeroExSubContract,
      '0x48BaCB9266a570d521063EF5dD96e61686DbE788',
      '0x1dc4c1cefef38a777b15aa20260a54e584b16c48',
      await (await OrderGateway.deployed()).paradigmBank.call(),
      JSON.stringify(ZeroExSubContractConfig.dataTypes)
    );//TODO: get address from
  });
};
