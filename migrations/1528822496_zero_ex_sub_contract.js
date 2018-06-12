var ZeroExSubContract = artifacts.require("./ZeroExSubContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ZeroExSubContract, '0x48BaCB9266a570d521063EF5dD96e61686DbE788');//TODO: get address from the config
};
