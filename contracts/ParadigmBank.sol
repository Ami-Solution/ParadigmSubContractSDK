pragma solidity ^0.4.24;

import "./Token.sol";

contract ParadigmBank {

    function transferFromOrigin(address token, address to, uint value) public returns (bool) {
        return Token(token).transferFrom(tx.origin, to, value);
    }

    function transferFromSignature(address token, address from, address to, uint value, uint8 v, bytes32 r, bytes32 s) public returns (bool) {
        require(validateSignature(token, from, to, value, v, r, s));
        return Token(token).transferFrom(from, to, value);
    }

    function validateSignature(address token, address from, address to, uint value, uint8 v, bytes32 r, bytes32 s) returns (bool) {
        bytes32 hash = keccak256("\x19Ethereum Signed Message:\n32", keccak256(token, from, to, value));
        address recoveredAddress = ecrecover(hash, v, r, s);

        return from ==  recoveredAddress;
    }
}