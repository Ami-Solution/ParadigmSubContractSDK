pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/OrderGateway.sol";
import "../contracts/ZeroExSubContract.sol";


contract ParameterTest {

    bytes32[] data;

    function testParametersAccepted() {
        OrderGateway gateway = new OrderGateway();
        ZeroExSubContract zesc = new ZeroExSubContract(0x48BaCB9266a570d521063EF5dD96e61686DbE788, 0x0000000000000000000000000000000000000000);

        data.length = 0;
        data.push(bytes32(address(0x7ed8e5d7884ff0be732479a475acb82f229c9e35)));//0 -- maker
        data.push(bytes32(address(0x0000000000000000000000000000000000000000)));//1 -- taker
        data.push(bytes32(address(0x1d7022f5b17d2f8b695918fb48fa1089c9f85401)));//2 -- makerTokenAddress
        data.push(bytes32(address(0x871dd7c2b4b25e1aa18728e9d5f2af4c4e431f5c)));//3 -- takerTokenAddress
        data.push(bytes32(address(0x0000000000000000000000000000000000000000)));//4 -- feeRecipient
        data.push(bytes32(uint(2)));//5 -- 0 -- makerTokenAmount
        data.push(bytes32(uint(2)));//6 -- 1 -- takerTokenAmount
        data.push(bytes32(uint(0)));//7 -- 2 -- makerFee
        data.push(bytes32(uint(0)));//8 -- 3 -- takerFee
        data.push(bytes32(uint(1528825222690)));//9 -- 4 -- expirationTimestampInSec
        data.push(bytes32(uint(17918777482716136294710988282224687194036438535048210820371006832618860789551)));//10 -- 5 -- salt
        data.push(bytes32(uint(1)));//11 -- takeAmount
        data.push(bytes32(uint(0)));//12 -- throw if fail
        data.push(bytes32(uint(27)));//13 -- v
        data.push(0x447f1c961d25c90bf43a9fc53b5e88fedc899adfc8fe944faae82e11543481c3);//14 -- r
        data.push(0x07c044c0ca05c2760cc163aecdb0699d1c8e830009415a40c2b2ef82085e8e8c);//15 -- s


        Assert.equal(gateway.participate(zesc, data), false, "Should Return");
    }
}