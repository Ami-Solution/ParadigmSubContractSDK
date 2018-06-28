const paradigmJS = require('paradigm.js');
const Token = artifacts.require("./Token.sol");
const OrderGateway = artifacts.require("./OrderGateway.sol");
const ParadigmBank = artifacts.require("./ParadigmBank.sol");

contract('ParadigmBank', async (accounts) => {
  let tokenA, orderGateway, paradigmBank;

  before(async () => {
    tokenA = await Token.new("TokenA", 'TKA', { from: accounts[1] });
    orderGateway = await OrderGateway.deployed();
    paradigmBank = ParadigmBank.at(await orderGateway.paradigmBank.call());
  });

  it('should allow transferFromSignature on valid signatures', async () => {
    //address token, address from, address to, uint value
    const dataTypes = ['address', 'address', 'address', 'uint'];
    const data = [tokenA.address, accounts[1], accounts[0], '1000'];

    const messageSignature = await paradigmJS.messages.signMessage(dataTypes, data, web3.currentProvider, accounts[1]);

    await tokenA.approve(paradigmBank.address, '1000', { from: accounts[1] });

    await paradigmBank.transferFromSignature(
      tokenA.address,
      accounts[1],
      accounts[0],
      1000,
      messageSignature[1][0],
      messageSignature[1][1],
      messageSignature[1][2]
    );
    (await tokenA.balanceOf.call(accounts[0])).toString().should.eq('1000');
  })
});