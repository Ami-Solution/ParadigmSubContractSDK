pragma solidity ^0.4.24;

import { ZeroExExchangeInterface as Exchange } from "./ZeroExExchangeInterface.sol";
import "./SubContract.sol";
import "./Token.sol";

contract ZeroExSubContract is SubContract {

  Exchange public exchange;
  address public proxy;

  function ZeroExSubContract(address _exchange, address _proxy, string _dataTypes) {
    exchange = Exchange(_exchange);
    proxy = _proxy;
    dataTypes = _dataTypes;
  }

  function participate(bytes32[] data) public returns (bool) {

    Token(address(data[3])).approve(proxy, uint(data[11]));

    uint value = exchange.fillOrder(
      [address(data[0]), address(data[1]), address(data[2]), address(data[3]), address(data[4])],
      [uint(data[5]), uint(data[6]), uint(data[7]), uint(data[8]), uint(data[9]), uint(data[10])],
      uint(data[11]), uint(data[12]) != 0, uint8(data[13]), data[14], data[15]);

    if(value > 0) {
      return Token(address(data[2])).transfer(address(data[16]), exchange.getPartialAmount(uint(data[5]), uint(data[6]), value));
    } else {
      return false;
    }
  }
}