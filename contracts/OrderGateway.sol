pragma solidity ^0.4.24;

//import "../installed_contracts/zeppelin/contracts/token/StandardToken.sol";
import "./SubContract.sol";



contract OrderGateway {

    bytes32[] bytesArray;

    event DealAdded(address dealOwner, uint timestamp, address modelAddress, address desiredToken, address paymentToken);

    function participate(address dealModel, address[] addresses, uint[] uints) returns (bool) {
        bytesArray.length = 0;
        bytesArray.push(bytes32(addresses[0]));
        other(bytesArray, addresses[0]);
        return SubContract(dealModel).participate(addresses, uints);
    }

    function other(bytes32[] b, address a) returns (bool) {
        require(address(b[0])==a);
    }
}