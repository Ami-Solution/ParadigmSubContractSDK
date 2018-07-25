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
        require(sendMaker(data));
        // transfer b -> a
        require(sendTaker(data));

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

    function sendMaker(bytes32[] data) returns (bool) {
        return paradigmBank.transferFromSignature(
            address(data[1]),
            address(data[0]),
            address(data[3]), //TODO: how do we get the taker address?  data[3]?
            uint(data[6]),
            address(data[7]),
            uint (data[8]),
            uint8(data[9]),
            bytes32(data[10]),
            bytes32(data[11]),
            uint(data[12])
        );
    }

    function sendTaker(bytes32[] data) returns (bool) {
        uint tokensTakerCount = ratioFor(uint(data[5]), uint(data[6]), uint(data[2]));

        return paradigmBank.transferFromSignature(
            address(data[4]),
            address(data[3]),
            address(data[0]),
            uint(tokensTakerCount),
            address(data[13]),
            uint (data[14]),
            uint8(data[15]),
            bytes32(data[16]),
            bytes32(data[17]),
            uint(data[18])
        );
    }
}
