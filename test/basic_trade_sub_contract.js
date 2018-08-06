const ParadigmJS = require('paradigm.js');
const Token = artifacts.require("./Token.sol");
const OrderGateway = artifacts.require("./OrderGateway.sol");
const ParadigmBank = artifacts.require("./ParadigmBank.sol");
const BasicTradeSubContract = artifacts.require('./BasicTradeSubContract.sol');

contract('BasicTradeSubContract', async (accounts) => {
  let tokenA, tokenB, orderGateway, paradigmBank, basicTradeSubContract, basicTradeSubContractMakerDataTypes, basicTradeSubContractTakerDataTypes;
  const paradigmJS = new ParadigmJS({ provider: web3.currentProvider, networkId: 50 });

  before(async () => {
    tokenA = await Token.new("TokenA", 'TKA', { from: accounts[0] });
    tokenB = await Token.new("TokenB", 'TKB', { from: accounts[1] });
    orderGateway = await OrderGateway.deployed();
    paradigmBank = ParadigmBank.at(await orderGateway.paradigmBank.call());
    basicTradeSubContract = await BasicTradeSubContract.deployed();
    basicTradeSubContractMakerDataTypes = JSON.parse(await basicTradeSubContract.makerDataTypes.call());
    basicTradeSubContractTakerDataTypes = JSON.parse(await basicTradeSubContract.takerDataTypes.call());
  });

  it('should allow a signed order to be traded', async () => {
    const signerData = paradigmJS.bank.createTransfer(basicTradeSubContract.address, tokenA.address, accounts[0], null, '1000', 0);
    const signerTransfer = await paradigmJS.bank.createSignedTransfer(signerData);
    await paradigmJS.bank.giveMaxAllowanceFor(tokenA.address, paradigmBank.address, accounts[0]);

    const buyerData = paradigmJS.bank.createTransfer(basicTradeSubContract.address, tokenB.address, accounts[1], null, '500', 0);
    const buyerTransfer = await paradigmJS.bank.createSignedTransfer(buyerData);
    await paradigmJS.bank.giveMaxAllowanceFor(tokenB.address, paradigmBank.address, accounts[1]);

    const order = {
      'signer': accounts[0],
      'signerToken': tokenA.address,
      'signerTokenCount': '1000',
      'buyer': accounts[1],
      'buyerToken': tokenB.address,
      'buyerTokenCount': '500',
      'tokensToBuy': '500',
      signerTransfer,
    };

    const take = {
      'tokensToBuy': '500',
      buyerTransfer
    };

    const makerData = await ParadigmJS.utils.toContractInput(basicTradeSubContractMakerDataTypes, order, web3.currentProvider, accounts[0]);
    const takerData = await ParadigmJS.utils.toContractInput(basicTradeSubContractTakerDataTypes, take, web3.currentProvider, accounts[1]);

    await orderGateway.participate(basicTradeSubContract.address, makerData, takerData, {from: accounts[1] });

    (await orderGateway.participate.estimateGas(basicTradeSubContract.address, makerData, takerData, {from: accounts[1] })).should.be.lt(130000, "Gas cost increased");
    (await tokenA.balanceOf(accounts[1])).toString().should.eq('500');
    (await tokenB.balanceOf(accounts[0])).toString().should.eq('250');
  })
});