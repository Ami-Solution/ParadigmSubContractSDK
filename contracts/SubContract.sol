pragma solidity ^0.4.24;

import "./ParadigmBank.sol";

contract SubContract {
    string public dataTypes;
    ParadigmBank public paradigmBank;

    function participate(bytes32[] data) public returns (bool);

    function getSigner(bytes32[] data) view public returns (address) {
        return address(data[0]);
    }

    function getOrderHash(bytes32[] data) returns (bytes32) {
        return keccak256(getSigner(data));
    }
}
