pragma solidity ^0.4.24;

import "./ParadigmBank.sol";
import "../installed_contracts/zeppelin/contracts/math/SafeMath.sol";

contract SubContract {
    using SafeMath for uint;

    string public makerDataTypes;
    string public takerDataTypes;
    ParadigmBank public paradigmBank;

    function participate(bytes32[] makerData, bytes32[] takerData) public returns (bool);

    function ratioFor(uint value, uint numerator, uint denominator) internal pure returns (uint) {
        return value.mul(numerator).div(denominator);
    }
}
