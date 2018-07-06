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
    const order = [
      accounts[0],
      tokenA.address,
      '1000',
      accounts[1],
      tokenB.address,
      '500',
      '500'
    ];

    const data = await paradigmJS.utils.toContractInput(basicTradeSubContractDataTypes, order, web3.currentProvider, accounts[0]);
    console.log(data);

    console.log(await orderGateway.participate.call(basicTradeSubContract.address, data, {from: accounts[1] }));
  })
});