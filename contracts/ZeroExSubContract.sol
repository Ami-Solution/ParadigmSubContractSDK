pragma solidity ^0.4.24;

import { ZeroExExchangeInterface as Exchange } from "./ZeroExExchangeInterface.sol";
import "./SubContract.sol";
import "./Token.sol";

contract ZeroExSubContract is SubContract {

  Exchange public exchange;
  address public zeroExProxy;

  constructor(address _exchange, address _proxy, string _makerArguments, string _takerArguments) public {
    exchange = Exchange(_exchange);
    zeroExProxy = _proxy;
    makerArguments = _makerArguments;
    takerArguments = _takerArguments;
  }

  function participate(bytes32[] makerData, bytes32[] takerData) public returns (bool) {
    address taker = address(takerData[2]);
    Token takerToken = Token(address(makerData[3]));
    Token makerToken = Token(address(makerData[2]));
    uint takerTokenToTrade = uint(takerData[0]);
    uint makerTokenCount = uint(makerData[5]);
    uint takerTokenCount = uint(makerData[6]);

    takerToken.transferFrom(taker, this, takerTokenToTrade);
    takerToken.approve(zeroExProxy, uint(takerData[0]));

    uint takerTokensTransferred = fillOrder(makerData, takerData);
    uint makerTokensToOutput = exchange.getPartialAmount(makerTokenCount, takerTokenCount, takerTokensTransferred);

    if(takerTokensTransferred > 0) {
      return makerToken.transfer(taker, makerTokensToOutput);
    } else {
      return false;
    }
  }

  function fillOrder(bytes32[] makerData, bytes32[] takerData) internal returns (uint) {
    return exchange.fillOrder(
      getAddresses(makerData),
      getNumbers(makerData),
      uint(takerData[0]), uint(takerData[1]) != 0, uint8(makerData[11]), makerData[12], makerData[13]);
  }

  function getAddresses(bytes32[] makerData) internal pure returns (address[5]) {
    address[5] memory addresses;
    addresses[0] = address(makerData[0]);
    addresses[1] = address(makerData[1]);
    addresses[2] = address(makerData[2]);
    addresses[3] = address(makerData[3]);
    addresses[4] = address(makerData[4]);
    return addresses;
  }
  function getNumbers(bytes32[] makerData) internal pure returns (uint[6]) {
    uint[6] memory numbers;

    numbers[0] = uint(makerData[5]);
    numbers[1] = uint(makerData[6]);
    numbers[2] = uint(makerData[7]);
    numbers[3] = uint(makerData[8]);
    numbers[4] = uint(makerData[9]);
    numbers[5] = uint(makerData[10]);

    return numbers;
  }
}