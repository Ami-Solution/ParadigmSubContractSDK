const ParadigmJS = require('paradigm.js');
const Token = artifacts.require("./Token.sol");
const OrderGateway = artifacts.require("./OrderGateway.sol");
const ParadigmBank = artifacts.require("./ParadigmBank.sol");

contract('ParadigmBank', async (accounts) => {
  let tokenA, orderGateway, paradigmBank, paradigmJS;

  before(async () => {
    tokenA = await Token.new("TokenA", 'TKA', { from: accounts[1] });
    orderGateway = await OrderGateway.deployed();
    paradigmBank = ParadigmBank.at(await orderGateway.paradigmBank.call());
    paradigmJS = new ParadigmJS({ provider: web3.currentProvider, networkId: 50 });
    await paradigmJS.bank.giveMaxAllowanceFor(tokenA.address, paradigmBank.address, accounts[1]);
  });

  it('should allow transferFromSignature on valid signatures', async () => {
    const startingBalance = await tokenA.balanceOf.call(accounts[0]);

    const data = paradigmJS.bank.createTransfer(accounts[0], tokenA.address, accounts[1], accounts[0], '1000', 1);
    const signedTransfer = await paradigmJS.bank.createSignedTransfer(data);

    await paradigmBank.transferFromSignature(
      signedTransfer.tokenAddress,
      signedTransfer.tokenHolder,
      accounts[0],
      1000,
      signedTransfer.recipient,
      signedTransfer.maxAmount,
      signedTransfer.signature.v,
      signedTransfer.signature.r,
      signedTransfer.signature.s,
      signedTransfer.nonce
    );
    (await tokenA.balanceOf.call(accounts[0])).toString().should.eq(startingBalance.add('1000').toString());
  });

  it('should allow 2 transferFromSignature on valid signatures', async () => {
    const startingBalance = await tokenA.balanceOf.call(accounts[0]);

    const data = paradigmJS.bank.createTransfer(accounts[0], tokenA.address, accounts[1], accounts[0], '1000', 2);
    const signedTransfer = await paradigmJS.bank.createSignedTransfer(data);

    await paradigmBank.transferFromSignature(
      signedTransfer.tokenAddress,
      signedTransfer.tokenHolder,
      accounts[0],
      500,
      signedTransfer.recipient,
      signedTransfer.maxAmount,
      signedTransfer.signature.v,
      signedTransfer.signature.r,
      signedTransfer.signature.s,
      signedTransfer.nonce
    );

    await paradigmBank.transferFromSignature(
      signedTransfer.tokenAddress,
      signedTransfer.tokenHolder,
      accounts[0],
      500,
      signedTransfer.recipient,
      signedTransfer.maxAmount,
      signedTransfer.signature.v,
      signedTransfer.signature.r,
      signedTransfer.signature.s,
      signedTransfer.nonce
    );

    (await tokenA.balanceOf.call(accounts[0])).toString().should.eq(startingBalance.add('1000').toString());
  });

  it('should allow 3 transferFromSignature on valid signatures', async () => {
    const startingBalance = await tokenA.balanceOf.call(accounts[0]);

    const data = paradigmJS.bank.createTransfer(accounts[0], tokenA.address, accounts[1], accounts[0], '1000', 3);
    const signedTransfer = await paradigmJS.bank.createSignedTransfer(data);


    await paradigmBank.transferFromSignature(
      signedTransfer.tokenAddress,
      signedTransfer.tokenHolder,
      accounts[0],
      300,
      signedTransfer.recipient,
      signedTransfer.maxAmount,
      signedTransfer.signature.v,
      signedTransfer.signature.r,
      signedTransfer.signature.s,
      signedTransfer.nonce
    );

    await paradigmBank.transferFromSignature(
      signedTransfer.tokenAddress,
      signedTransfer.tokenHolder,
      accounts[0],
      300,
      signedTransfer.recipient,
      signedTransfer.maxAmount,
      signedTransfer.signature.v,
      signedTransfer.signature.r,
      signedTransfer.signature.s,
      signedTransfer.nonce
    );

    await paradigmBank.transferFromSignature(
      signedTransfer.tokenAddress,
      signedTransfer.tokenHolder,
      accounts[0],
      400,
      signedTransfer.recipient,
      signedTransfer.maxAmount,
      signedTransfer.signature.v,
      signedTransfer.signature.r,
      signedTransfer.signature.s,
      signedTransfer.nonce
    );

    (await tokenA.balanceOf.call(accounts[0])).toString().should.eq(startingBalance.add('1000').toString());
  });

  it('shouldn\'t allow transferFromSignature from invalid msg.sender', async () => {
    const data = paradigmJS.bank.createTransfer(accounts[1], tokenA.address, accounts[1], accounts[0], '1000', 4);
    const signedTransfer = await paradigmJS.bank.createSignedTransfer(data);


    paradigmBank.transferFromSignature(
      signedTransfer.tokenAddress,
      signedTransfer.tokenHolder,
      accounts[0],
      1000,
      signedTransfer.recipient,
      signedTransfer.maxAmount,
      signedTransfer.signature.v,
      signedTransfer.signature.r,
      signedTransfer.signature.s,
      signedTransfer.nonce
    ).should.eventually.be.rejected;
  })
});