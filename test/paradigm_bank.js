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
    const dataTypes = ['address', 'address', 'address', 'address', 'uint', 'uint'];
    const data = [accounts[0], tokenA.address, accounts[1], accounts[0], '1000', 1];

    const messageSignature = await paradigmJS.messages.signMessage(dataTypes, data, web3.currentProvider, accounts[1]);

    await tokenA.approve(paradigmBank.address, '1000', { from: accounts[1] });
    const startingBalance = await tokenA.balanceOf.call(accounts[0]);

    await paradigmBank.transferFromSignature(
      tokenA.address,
      accounts[1],
      accounts[0],
      1000,
      accounts[0],
      1000,
      messageSignature.signature.v,
      messageSignature.signature.r,
      messageSignature.signature.s,
      1
    );
    (await tokenA.balanceOf.call(accounts[0])).toString().should.eq(startingBalance.add('1000').toString());
  });

  it('should allow 2 transferFromSignature on valid signatures', async () => {
    //address token, address from, address to, uint value
    const dataTypes = ['address', 'address', 'address', 'address', 'uint', 'uint'];
    const data = [accounts[0], tokenA.address, accounts[1], accounts[0], '1000', 2];

    const messageSignature = await paradigmJS.messages.signMessage(dataTypes, data, web3.currentProvider, accounts[1]);

    await tokenA.approve(paradigmBank.address, '1000', { from: accounts[1] });
    const startingBalance = await tokenA.balanceOf.call(accounts[0]);

    await paradigmBank.transferFromSignature(
      tokenA.address,
      accounts[1],
      accounts[0],
      500,
      accounts[0],
      1000,
      messageSignature.signature.v,
      messageSignature.signature.r,
      messageSignature.signature.s,
      2
    );

    await paradigmBank.transferFromSignature(
      tokenA.address,
      accounts[1],
      accounts[0],
      500,
      accounts[0],
      1000,
      messageSignature.signature.v,
      messageSignature.signature.r,
      messageSignature.signature.s,
      2
    );

    (await tokenA.balanceOf.call(accounts[0])).toString().should.eq(startingBalance.add('1000').toString());
  });

  it('should allow 3 transferFromSignature on valid signatures', async () => {
    //address token, address from, address to, uint value
    const dataTypes = ['address', 'address', 'address', 'address', 'uint', 'uint'];
    const data = [accounts[0], tokenA.address, accounts[1], accounts[0], '1000', 3];

    const messageSignature = await paradigmJS.messages.signMessage(dataTypes, data, web3.currentProvider, accounts[1]);

    await tokenA.approve(paradigmBank.address, '1000', { from: accounts[1] });
    const startingBalance = await tokenA.balanceOf.call(accounts[0]);

    await paradigmBank.transferFromSignature(
      tokenA.address,
      accounts[1],
      accounts[0],
      300,
      accounts[0],
      1000,
      messageSignature.signature.v,
      messageSignature.signature.r,
      messageSignature.signature.s,
      3
    );

    await paradigmBank.transferFromSignature(
      tokenA.address,
      accounts[1],
      accounts[0],
      300,
      accounts[0],
      1000,
      messageSignature.signature.v,
      messageSignature.signature.r,
      messageSignature.signature.s,
      3
    );

    await paradigmBank.transferFromSignature(
      tokenA.address,
      accounts[1],
      accounts[0],
      400,
      accounts[0],
      1000,
      messageSignature.signature.v,
      messageSignature.signature.r,
      messageSignature.signature.s,
      3
    );

    (await tokenA.balanceOf.call(accounts[0])).toString().should.eq(startingBalance.add('1000').toString());
  });

  it('shouldn\'t allow transferFromSignature from invalid msg.sender', async () => {
    //address token, address from, address to, uint value
    const dataTypes = ['address', 'address', 'address', 'address', 'uint'];
    const data = [accounts[1], tokenA.address, accounts[1], accounts[0], '1000'];

    const messageSignature = await paradigmJS.messages.signMessage(dataTypes, data, web3.currentProvider, accounts[1]);

    await tokenA.approve(paradigmBank.address, '1000', { from: accounts[1] });

    paradigmBank.transferFromSignature(
      tokenA.address,
      accounts[1],
      accounts[0],
      1000,
      accounts[0],
      1000,
      messageSignature.signature.v,
      messageSignature.signature.r,
      messageSignature.signature.s
    ).should.eventually.be.rejected;
  })
});