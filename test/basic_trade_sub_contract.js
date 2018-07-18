const paradigmJS = require('paradigm.js');
const Token = artifacts.require("./Token.sol");
const OrderGateway = artifacts.require("./OrderGateway.sol");
const ParadigmBank = artifacts.require("./ParadigmBank.sol");
const BasicTradeSubContract = artifacts.require('./BasicTradeSubContract.sol');

contract('BasicTradeSubContract', async (accounts) => {
  let tokenA, tokenB, orderGateway, paradigmBank, basicTradeSubContract, basicTradeSubContractDataTypes;

  before(async () => {
    tokenA = await Token.new("TokenA", 'TKA', { from: accounts[0] });
    tokenB = await Token.new("TokenB", 'TKB', { from: accounts[1] });
    orderGateway = await OrderGateway.deployed();
    paradigmBank = ParadigmBank.at(await orderGateway.paradigmBank.call());
    basicTradeSubContract = await BasicTradeSubContract.deployed();
    basicTradeSubContractDataTypes = JSON.parse(await basicTradeSubContract.dataTypes.call());
  });

  it('should allow a signed order to be traded', async () => {
    const order = {
      'signer': accounts[0],
      'signerToken': tokenA.address,
      'signerTokenCount': '1000',
      'buyer': accounts[1],
      'buyerToken': tokenB.address,
      'buyerTokenCount': '500',
      'tokensToBuy': '500'
    };

    const data = await paradigmJS.utils.toContractInput(basicTradeSubContractDataTypes, order, web3.currentProvider, accounts[0]);

    (await orderGateway.participate.estimateGas(basicTradeSubContract.address, data, {from: accounts[1] })).should.be.lt(44000, "Gas cost increased");
    console.log(await orderGateway.participate.estimateGas(basicTradeSubContract.address, data, {from: accounts[1] }));

    console.log(await orderGateway.participate.call(basicTradeSubContract.address, data, {from: accounts[1] }));
  })
});