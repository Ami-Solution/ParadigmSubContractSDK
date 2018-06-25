pragma solidity ^0.4.24;

import "./SubContract.sol";
import "./ParadigmBank.sol";

contract OrderGateway {

    ParadigmBank public paradigmBank;

    event DealAdded(address dealOwner, uint timestamp, address modelAddress, address desiredToken, address paymentToken);

    constructor() public {
        paradigmBank = new ParadigmBank();
    }

    function participate(address subContract, bytes32[] data) public returns (bool) {
        return SubContract(subContract).participate(data);
    }

    function dataTypes(address subContract) public view returns (string) {
        return SubContract(subContract).dataTypes();
    }
}