pragma solidity ^0.4.11;


import "../installed_contracts/zeppelin/contracts/token/StandardToken.sol";

contract Token is StandardToken {

  string public name;
  string public symbol;
  uint8 public decimals = 18;

  function Token(string _name, string _symbol) {
    balances[msg.sender] = 100000 ether;
    totalSupply = 100000 ether;
    name = _name;
    symbol = _symbol;
  }
}
