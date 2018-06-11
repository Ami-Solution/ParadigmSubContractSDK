pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/OrderGateway.sol";
import "../contracts/ZeroExSubContract.sol";


contract ParameterTest {

    bytes32[] data;

    function testParametersAccepted() {
        OrderGateway gateway = new OrderGateway();
        ZeroExSubContract zesc = new ZeroExSubContract();

        data.length = 0;
        data.push(bytes32(address(0x0)));
        data.push(bytes32(address(0x0)));
        data.push(bytes32(address(0x0)));
        data.push(bytes32(address(0x0)));
        data.push(bytes32(address(0x0)));
        data.push(bytes32(address(0x0)));
        data.push(bytes32(address(0x0)));
        data.push(bytes32(address(0x0)));
        data.push(bytes32(uint(0)));
        data.push(bytes32(uint(0)));
        data.push(bytes32(uint(0)));
        data.push(bytes32(uint(0)));
        data.push(bytes32(uint(0)));
        data.push(bytes32(uint(0)));
        data.push(bytes32(uint(0)));
        data.push(bytes32(uint(0)));
        data.push(bytes32(uint(0)));
        data.push(bytes32(uint(0)));
        data.push(bytes32(uint(0)));

        Assert.equal(gateway.participate(zesc, data), true, "Should Return");
    }
}