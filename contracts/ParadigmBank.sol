pragma solidity ^0.4.24;

import "./Token.sol";

contract ParadigmBank {

    function transferFrom(address token, address to, uint value) public returns (bool) {
        return Token(token).transferFrom(tx.origin, to, value);
    }
}