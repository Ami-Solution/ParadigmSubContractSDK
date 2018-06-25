pragma solidity ^0.4.24;

import { ZeroExExchangeInterface as Exchange } from "./ZeroExExchangeInterface.sol";
import "./SubContract.sol";
import "./Token.sol";

contract ZeroExSubContract is SubContract {

  Exchange public exchange;
  address public zeroExProxy;

  constructor(address _exchange, address _proxy, address _paradigmBank, string _dataTypes) public {
    exchange = Exchange(_exchange);
    zeroExProxy = _proxy;
    dataTypes = _dataTypes;
    paradigmBank = ParadigmBank(_paradigmBank);
  }

  function participate(bytes32[] data) public returns (bool) {
    address taker = address(data[16]);
//    require(tx.origin == taker); //TODO: do we care?
    Token(address(data[3])).approve(zeroExProxy, uint(data[11])); //TODO perhaps do a transfer from using tx.origin?

    uint value = exchange.fillOrder(
      [address(data[0]), address(data[1]), address(data[2]), address(data[3]), address(data[4])],
      [uint(data[5]), uint(data[6]), uint(data[7]), uint(data[8]), uint(data[9]), uint(data[10])],
      uint(data[11]), uint(data[12]) != 0, uint8(data[13]), data[14], data[15]);

    if(value > 0) {
      return Token(address(data[2])).transfer(taker, exchange.getPartialAmount(uint(data[5]), uint(data[6]), value));
    } else {
      return false;
    }
  }
}