pragma solidity ^0.4.24;

import "./ParadigmBank.sol";
import "../installed_contracts/zeppelin/contracts/math/SafeMath.sol";

contract SubContract {
    using SafeMath for uint;

    string public dataTypes;
    ParadigmBank public paradigmBank;

    function participate(bytes32[] data) public returns (bool);

    function ratioFor(uint value, uint numerator, uint denominator) internal pure returns (uint) {
        return value.mul(numerator).div(denominator);
    }
}
