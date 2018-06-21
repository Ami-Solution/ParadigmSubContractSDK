pragma solidity ^0.4.24;

//import "../installed_contracts/zeppelin/contracts/token/StandardToken.sol";
import "./SubContract.sol";

contract OrderGateway {

    event DealAdded(address dealOwner, uint timestamp, address modelAddress, address desiredToken, address paymentToken);

    function participate(address subContract, bytes32[] data) returns (bool) {
        return SubContract(subContract).participate(data);
    }
}