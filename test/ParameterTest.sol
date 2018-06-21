pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/OrderGateway.sol";
import "../contracts/ZeroExSubContract.sol";


contract ParameterTest {

    bytes32[] data;

    function testParametersAccepted() {
        OrderGateway gateway = new OrderGateway();
        ZeroExSubContract zesc = new ZeroExSubContract(0x48BaCB9266a570d521063EF5dD96e61686DbE788, 0x0000000000000000000000000000000000000000, "");

        data.length = 0;//Clears data to zero length array
        data.push(bytes32(address(0x7ed8E5d7884FF0Be732479a475ACB82f229C9e35)));//0 -- maker
        data.push(bytes32(address(0x0000000000000000000000000000000000000000)));//1 -- taker
        data.push(bytes32(address(0x1D7022f5B17d2F8B695918FB48fa1089C9f85401)));//2 -- makerTokenAddress
        data.push(bytes32(address(0x871DD7C2B4b25E1Aa18728e9D5f2Af4C4e431f5c)));//3 -- takerTokenAddress
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
        data.push(bytes32(tx.origin));


        Assert.equal(gateway.participate(zesc, data), false, "Should Return");
    }
}