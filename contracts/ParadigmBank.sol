pragma solidity ^0.4.24;

import "./Token.sol";

contract ParadigmBank {

    event ToSend(address token, address origin, address to, uint value);
    event TokenBalanceForOrigin(uint value);
    event TokenApprovalFromOrigin(uint value);

    function transferFromOrigin(address token, address to, uint value) public returns (bool) {
        emit ToSend(token, tx.origin, to, value);
        emit TokenBalanceForOrigin(Token(token).balanceOf(tx.origin));
        emit TokenApprovalFromOrigin(Token(token).allowance(tx.origin, this));

        return Token(token).transferFrom(tx.origin, to, value);
    }
}