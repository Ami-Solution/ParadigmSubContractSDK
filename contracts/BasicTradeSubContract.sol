pragma solidity ^0.4.24;

import "./SubContract.sol";
import "./SignatureVerification.sol";
import "./Token.sol";

contract BasicTradeSubContract is SubContract, SignatureVerification {

    mapping(bytes32 => uint) bought;

    constructor(address _paradigmBank, string _dataTypes) {
      paradigmBank = ParadigmBank(_paradigmBank);
      dataTypes = _dataTypes;
    }

    function participate(bytes32[] data) public returns (bool) {
      // 1. Standard validation
      require(verify(data));

      // 2. Contract specific validation
      uint signerTokenCount = uint(data[2]);
      uint buyerTokenCountToTrade = uint(data[5]);
      require(bought[getOrderHash(data)] + buyerTokenCountToTrade < signerTokenCount);

      // transfer a -> b
      // transfer b -> a

      return true;
    }

    function getOrderHash(bytes32[] data) returns (bytes32) {
      address signerToken = address(data[1]);
      uint signerTokenCount = uint(data[2]);
      address buyer = address(data[3]);
      address buyerToken = address(data[4]);
      uint buyerTokenCount = uint(data[5]);
      return keccak256(getSigner(data), signerToken, signerTokenCount, buyer, buyerToken, buyerTokenCount);
    }

}
