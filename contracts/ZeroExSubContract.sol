pragma solidity ^0.4.24;

import { ZeroExExchangeInterface as Exchange } from "./ZeroExExchangeInterface.sol";
import "./SubContract.sol";
import "./Token.sol";

contract ZeroExSubContract is SubContract {

  Exchange public exchange;
  address public zeroExProxy;

  event ToSend(address from, address token, address to, uint value);
  event balance(address token, uint balance);
  event Values(uint calculated);

  constructor(address _exchange, address _proxy, address _paradigmBank, string _dataTypes) public {
    exchange = Exchange(_exchange);
    zeroExProxy = _proxy;
    dataTypes = _dataTypes;
    paradigmBank = ParadigmBank(_paradigmBank);
  }

  function participate(bytes32[] data) public returns (bool) {
    address taker = address(data[16]);
    Token takerToken = Token(address(data[3]));
    Token makerToken = Token(address(data[2]));
    uint takerTokenToTrade = uint(data[11]);
    uint makerTokenCount = uint(data[5]);
    uint takerTokenCount = uint(data[6]);

    paradigmBank.transferFromOrigin(takerToken, address(this), takerTokenToTrade);

    takerToken.approve(zeroExProxy, uint(data[11])); //TODO perhaps do a transfer from using tx.origin?

    uint takerTokensTransferred = fillOrder(data);
    uint makerTokensToOutput = exchange.getPartialAmount(makerTokenCount, takerTokenCount, takerTokensTransferred);

    if(takerTokensTransferred > 0) {
      emit ToSend(this, address(data[2]), taker, makerTokensToOutput);
      emit balance(address(data[2]), Token(address(data[2])).balanceOf(this));
      emit Values(makerTokensToOutput);
      return makerToken.transfer(taker, makerTokensToOutput -1); //TODO: Figure out why the whole value can't be transfered!!
    } else {
      return false;
    }
  }

  function fillOrder(bytes32[] data) internal returns (uint) {
    return exchange.fillOrder(
      getAddresses(data),
      getNumbers(data),
      uint(data[11]), uint(data[12]) != 0, uint8(data[13]), data[14], data[15]);
  }

  function getAddresses(bytes32[] data) internal pure returns (address[5]) {
    address[5] memory addresses;
    addresses[0] = address(data[0]);
    addresses[1] = address(data[1]);
    addresses[2] = address(data[2]);
    addresses[3] = address(data[3]);
    addresses[4] = address(data[4]);
    return addresses;
  }
  function getNumbers(bytes32[] data) internal pure returns (uint[6]) {
    uint[6] memory numbers;

    numbers[0] = uint(data[5]);
    numbers[1] = uint(data[6]);
    numbers[2] = uint(data[7]);
    numbers[3] = uint(data[8]);
    numbers[4] = uint(data[9]);
    numbers[5] = uint(data[10]);

    return numbers;
  }
}