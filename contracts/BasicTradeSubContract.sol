pragma solidity ^0.4.24;

import "./SubContract.sol";
import "./Token.sol";

contract BasicTradeSubContract is SubContract {

    mapping(bytes32 => uint) bought;

    constructor(address _paradigmBank, string _dataTypes) {
        paradigmBank = ParadigmBank(_paradigmBank);
        dataTypes = _dataTypes;
    }

    function participate(bytes32[] data) public returns (bool) {
        require(validate(data));
//        transfer a -> b
//        transfer b->a

        return false;
    }

    function validate(bytes32[] data) public returns (bool) {
        address signer = address(data[0]);
        address signerToken = address(data[1]);
        uint signerTokenCount = uint(data[2]);
        address buyer = address(data[3]);
        address buyerToken = address(data[4]);
        uint buyerTokenCount = uint(data[5]);
        uint buyerTokenCountToTrade = uint(data[5]);
        uint8 v = uint8(data[7]);
        bytes32 r = data[8];
        bytes32 s = data[9];

        //TODO: validate remaining tokens
        bytes32 message = paramHash(signer, signerToken, signerTokenCount, buyer, buyerToken, buyerTokenCount);
        if(bought[message] + buyerTokenCountToTrade < signerTokenCount) { //TODO: safemath
            return validateSignature(signer, message, v, r, s);
        } else {
            return false;
        }
    }

    function paramHash(
        address signer, address signerToken, uint signerTokenCount, address buyer,
        address buyerToken, uint buyerTokenCount
    ) returns (bytes32)
    {
        return keccak256(signer, signerToken, signerTokenCount, buyer, buyerToken, buyerTokenCount);
    }

    function validateSignature(address signer, bytes32 message, uint8 v, bytes32 r, bytes32 s
    ) returns (bool) {
        bytes32 hash = keccak256("\x19Ethereum Signed Message:\n32", message);
        address recoveredAddress = ecrecover(hash, v, r, s);

        return signer ==  recoveredAddress;
    }
}