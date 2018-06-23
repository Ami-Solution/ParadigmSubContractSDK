pragma solidity ^0.4.24;

import "./SubContract.sol";

contract OrderGateway {

    event DealAdded(address dealOwner, uint timestamp, address modelAddress, address desiredToken, address paymentToken);

    function participate(address subContract, bytes32[] data) public returns (bool) {
        return SubContract(subContract).participate(data);
    }

    function dataTypes(address subContract) public view returns (string) {
        return SubContract(subContract).dataTypes();
    }
}