pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/OrderGateway.sol";
import "../contracts/ZeroExSubContract.sol";


contract ParameterTest {

    address[] addressParams;
    uint[] numberParams;

    function testParametersAccepted() {
        OrderGateway gateway = new OrderGateway();
        ZeroExSubContract zesc = new ZeroExSubContract();

        addressParams.length = 0;
        addressParams.push(address(gateway));
        addressParams.push(address(gateway));
        addressParams.push(address(gateway));
        addressParams.push(address(gateway));
        addressParams.push(address(gateway));
        addressParams.push(address(gateway));
        addressParams.push(address(gateway));
        addressParams.push(address(gateway));

        numberParams.length = 0;
        numberParams.push(uint(0));
        numberParams.push(uint(0));
        numberParams.push(uint(0));
        numberParams.push(uint(0));
        numberParams.push(uint(0));
        numberParams.push(uint(0));
        numberParams.push(uint(0));
        numberParams.push(uint(0));
        numberParams.push(uint(0));
        numberParams.push(uint(0));
        numberParams.push(uint(0));

        Assert.equal(gateway.participate(zesc, addressParams, numberParams), true, "Should Return");
    }
}