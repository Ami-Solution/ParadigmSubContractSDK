pragma solidity ^0.4.24;

import "./SubContract.sol";

contract SignatureVerification is SubContract {

  function verify(bytes32[] data) returns (bool) {
    uint8   v = uint8(data[data.length - 3]);
    bytes32 r = data[data.length - 2];
    bytes32 s = data[data.length - 1];

    return checkSignature(getSigner(data), getOrderHash(data), v, r, s);
  }

  function checkSignature(address signer, bytes32 orderHash, uint8 v, bytes32 r, bytes32 s) returns (bool) {
    bytes32 hash = keccak256("\x19Ethereum Signed Message:\n32", orderHash);
    address recoveredAddress = ecrecover(hash, v, r, s);
    return signer == recoveredAddress;
  }

}
