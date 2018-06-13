const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Web3 = require('web3');

chai.use(chaiAsPromised);

global.utils = {
  toBytes32: (value) => {
    return Web3.utils.toTwosComplement(Web3.utils.toHex(value));
  }
}
before(() => {
  expect = chai.expect
  chai.should()
});