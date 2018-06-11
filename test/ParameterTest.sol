pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/OrderGateway.sol";
import "../contracts/ZeroExSubContract.sol";


contract ParameterTest {

    bytes32[] data;

    function testParametersAccepted() {
        OrderGateway gateway = new OrderGateway();
        ZeroExSubContract zesc = new ZeroExSubContract(0x48BaCB9266a570d521063EF5dD96e61686DbE788);

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