pragma solidity ^0.4.24;

import "./ParadigmBank.sol";

contract SubContract {
  string public dataTypes;
  ParadigmBank public paradigmBank;

  function participate(bytes32[]) public returns (bool);
}
