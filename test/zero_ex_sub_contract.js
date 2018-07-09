const ZeroExSubContract = artifacts.require("./ZeroExSubContract.sol");
const OrderGateway = artifacts.require("./OrderGateway.sol");
const Token = artifacts.require("./Token.sol");
const ZeroEx = require('0x.js').ZeroEx;
const BigNumber = require('@0xproject/utils').BigNumber;
const ZeroExSubContractConfig = require('../configuration/ZeroExSubContract');
const ParadigmJS = require('paradigm.js');

contract('ZeroExSubContract', async function(accounts) {
  let tokenA, tokenB, orderGateway, paradigmBank, zeroExSubContract, zeroExSubContractDataTypes, zeroEx,
    WETH_ADDRESS, ZRX_ADDRESS, EXCHANGE_ADDRESS, PROXY;

  before(async () => {
    tokenA = await Token.new("TokenA", 'TKA', { from: accounts[1] });
    tokenB = await Token.new("TokenB", 'TKB', { from: accounts[2] });
    orderGateway = await OrderGateway.deployed();
    paradigmBank = await orderGateway.paradigmBank.call();
    zeroExSubContract = await ZeroExSubContract.deployed();
    zeroExSubContractDataTypes = JSON.parse(await orderGateway.dataTypes.call(zeroExSubContract.address));
    zeroEx = new ZeroEx(web3.currentProvider, { networkId: 50 });

    WETH_ADDRESS = zeroEx.etherToken.getContractAddressIfExists();
    ZRX_ADDRESS = zeroEx.exchange.getZRXTokenAddress();
    EXCHANGE_ADDRESS = zeroEx.exchange.getContractAddress();
    PROXY = zeroEx.proxy.getContractAddress();

    await zeroEx.token.setUnlimitedAllowanceAsync(tokenA.address, accounts[1], PROXY);

    await zeroEx.token.setUnlimitedAllowanceAsync(tokenB.address, accounts[2], PROXY);
  });

  it("should have ZeroEx configured correctly", async function() {
    "0x1d7022f5b17d2f8b695918fb48fa1089c9f85401".should.equal(ZRX_ADDRESS, 'ZRXToken address mismatch');
    "0x871dd7c2b4b25e1aa18728e9d5f2af4c4e431f5c".should.equal(WETH_ADDRESS, 'EtherToken address mismatch');
    "0x48bacb9266a570d521063ef5dd96e61686dbe788".should.equal(EXCHANGE_ADDRESS, 'Exchange address mismatch');
    "0x0b1ba0af832d7c05fd64161e0db78e85978e8082".should.equal(zeroEx.tokenRegistry.getContractAddress(), 'TokenRegistry address mismatch');
    "0x1dc4c1cefef38a777b15aa20260a54e584b16c48".should.equal(PROXY, 'TokenTransferProxy address mismatch');
    "0x5409ed021d9299bf6814279a6a1411a7e866a631".should.equal(accounts[0], 'ZRXToken balance holder address mismatch');
  });

  it('should handle a very basic transfer', async () => {
    const order = {
      maker: accounts[1],
      taker: ZeroEx.NULL_ADDRESS,
      feeRecipient: ZeroEx.NULL_ADDRESS,
      makerTokenAddress: tokenA.address,
      takerTokenAddress: tokenB.address,
      exchangeContractAddress: EXCHANGE_ADDRESS,
      salt: ZeroEx.generatePseudoRandomSalt(),
      makerFee: new BigNumber(0),
      takerFee: new BigNumber(0),
      makerTokenAmount: ZeroEx.toBaseUnitAmount(new BigNumber(0.2), 18), // Base 18 decimals
      takerTokenAmount: ZeroEx.toBaseUnitAmount(new BigNumber(0.3), 18), // Base 18 decimals
      expirationUnixTimestampSec: new BigNumber(Date.now() + 3600000)
    };
    const ecSignature = await zeroEx.signOrderHashAsync(ZeroEx.getOrderHashHex(order), accounts[1], false);
    const input = await ParadigmJS.utils.toContractInput(zeroExSubContractDataTypes,
      [
        order.maker,
        order.taker,
        order.makerTokenAddress,
        order.takerTokenAddress,
        order.feeRecipient,
        order.makerTokenAmount,
        order.takerTokenAmount,
        order.makerFee,
        order.takerFee,
        order.expirationUnixTimestampSec,
        order.salt,
        order.takerTokenAmount,
        false,
        ecSignature.v,
        ecSignature.r,
        ecSignature.s,
        accounts[2]
      ],
      { from: accounts[2] }
    );

    await tokenB.approve(paradigmBank, order.takerTokenAmount, { from: accounts[2] });

    await orderGateway.participate(
      zeroExSubContract.address,
      input,
      { from: accounts[2] }
    );


    (await tokenA.balanceOf.call(accounts[2])).toString().should.eq(order.makerTokenAmount.toString());
    (await tokenB.balanceOf.call(accounts[1])).toString().should.eq(order.takerTokenAmount.toString());
  });

  it('should provide the input datatypes', async () => {
    zeroExSubContractDataTypes.should.deep.equal(ZeroExSubContractConfig.dataTypes)
  });
});
