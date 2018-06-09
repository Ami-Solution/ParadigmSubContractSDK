pragma solidity ^0.4.24;

//import { ZeroExExchangeInterface as Exchange } from "./ZeroExExchangeInterface.sol";
import "./SubContract.sol";
//import "./Token.sol";

contract ZeroExSubContract is SubContract {

  function participate(address[] addresses, uint[] values) returns (bool) {

    return fillOrder(
      [addresses[0], addresses[1], addresses[2], addresses[3], addresses[4]],
      [values[0], values[1], values[2], values[3], values[4], values[5]],
      values[6], values[7] == 1, uint8(values[8]), bytes32(values[9]), bytes32(values[10]));
  }

  function fillOrder(
    address[5] orderAddresses,
    uint[6] orderValues,
    uint fillTakerTokenAmount,
    bool shouldThrowOnInsufficientBalanceOrAllowance,
    uint8 v,
    bytes32 r,
    bytes32 s) returns (bool) {
//    Dummy test fill order.
    return true;
  }

//  using SafeMath for uint256;
//
//  address public ZeroExExchangeAddress;
//  address public ZRX_TOKEN_CONTRACT_ADDRESS;
//  address public TOKEN_TRANSFER_PROXY_CONTRACT;
//  Exchange internal EXC;
//  Token internal ZRX;
//
//  address[5][] internal arrOrderAddresses;
//  uint256[6][] internal arrOrderValues;
//  uint8[] internal arrV;
//  bytes32[] internal arrR;
//  bytes32[] internal arrS;
//
//
//  event TakerAddressMismatch(address this, address takerAddress);
//  event InsufficientAllowance(address token, uint allowanceNeeded, uint allowanceAvailable);
//  event InsufficientBalance(address token, uint balanceNeeded, uint balanceAvailable);
//
//  event InitialTransferFailure(address tokenAddress, uint amount);
//  event FinalTransferFailure(address tokenAddress, uint amount);
//
//
//
//function ZeroExPath(address _ZeroExExchangeAddress) {
//    ZeroExExchangeAddress = _ZeroExExchangeAddress;
//    EXC = Exchange(ZeroExExchangeAddress);
//    ZRX_TOKEN_CONTRACT_ADDRESS = EXC.ZRX_TOKEN_CONTRACT();
//    ZRX = Token(ZRX_TOKEN_CONTRACT_ADDRESS);
//    TOKEN_TRANSFER_PROXY_CONTRACT = EXC.TOKEN_TRANSFER_PROXY_CONTRACT();
//  }
//
//  function path(
//    address[5][]orderAddresses,
//    uint[6][] orderValues,
//    uint[] fillTakerTokenAmount,
//    uint8[] v,
//    bytes32[] r,
//    bytes32[] s
//  ) {
//    uint i;
//
//    //TODO: IF SOMEONE TRIES TO FEED IT SHIT DO WE CARE?
//
//    //TODO: Does this contract have permission to take all of the orders?
//    for (i = 0; i < orderAddresses.length; i++) {
//      if(!(orderAddresses[i][1] != address(0) || orderAddresses[i][1] != address(this))) {
//        emit TakerAddressMismatch(this, orderAddresses[i][1]);
//      }
//      //TODO emit error?  Change to require so it just throws?
//    }
//
//    //TODO: is the path valid?  Do we fix it?  Do we require a linear path or are parellel branches viable?
//    /*for (i = 1; i< orderAddresses.length; i++) {
//      require(orderAddresses[i-1][0][2] != orderAddresses[i][0][3]); //Previous maker yields next taker TODO: do we allow chains of complex paths like a -> b (partially consumes a),  a -> c, b -> c, b -> c, c -> d
//      //TODO emit error?  Change to require so it just throws?
//    }*/
//
//    uint totalTakerFees; //Total fee tokens needed for transaction chain.
//    for (i = 0; i < orderAddresses.length; i++) {
//      totalTakerFees = totalTakerFees.add(EXC.getPartialAmount(fillTakerTokenAmount[i], orderValues[i][1], orderValues[i][3]));
//    }
//
//    if(totalTakerFees > 0) {
//      //Gathering fee tokens
//      takeTokenFromAddress(ZRX_TOKEN_CONTRACT_ADDRESS, msg.sender, totalTakerFees);
//
//      //Approving tokens though token proxy
//      require(ZRX.approve(TOKEN_TRANSFER_PROXY_CONTRACT, totalTakerFees));
//    }
//
//    //Gathering initial taker tokens //TODO: If source token is used in more than one deal how do we handle it?  Seperate function parameter?
//    takeTokenFromAddress(orderAddresses[0][3], msg.sender, fillTakerTokenAmount[0]);
//
//    for (i = 0; i < orderAddresses.length;  i++) {
//      Token(orderAddresses[i][3]).approve(TOKEN_TRANSFER_PROXY_CONTRACT, fillTakerTokenAmount[i]);
//
//      arrOrderAddresses.length = 0;
//      arrOrderAddresses.push(orderAddresses[i]);
//      arrOrderValues.length = 0;
//      arrOrderValues.push(orderValues[i]);
//      arrV.length = 0;
//      arrV.push(v[i]);
//      arrR.length = 0;
//      arrR.push(r[i]);
//      arrS.length = 0;
//      arrS.push(s[i]);
//
//      EXC.fillOrdersUpTo(
//        arrOrderAddresses,
//        arrOrderValues,
//        fillTakerTokenAmount[i],
//        false,
//        arrV,
//        arrR,
//        arrS
//      );
//    }
//
//    uint yield = EXC.getPartialAmount(fillTakerTokenAmount[fillTakerTokenAmount.length - 1], orderValues[orderValues.length - 1][1], orderValues[orderValues.length - 1][0]);
//    Token(orderAddresses[orderAddresses.length - 1][2]).transfer(msg.sender, yield);  //TODO: If source token is used in more than one deal how do we handle it?  Seperate function parameter?
//  }
//
//  function takeTokenFromAddress(address tokenAddress, address holder, uint amount) internal returns (bool){
//    Token t = Token(tokenAddress);
//    uint userBalance = t.balanceOf(holder);
//    if(userBalance >= amount) {
//      uint contractAllowance = t.allowance(holder, this);
//      if(contractAllowance >= amount) {
//        t.transferFrom(holder, this, amount);
//        return true;
//      } else {
//        emit InsufficientAllowance(tokenAddress, amount, contractAllowance);
//        return false;
//      }
//    } else {
//      emit InsufficientBalance(tokenAddress, amount, userBalance);
//      return false;
//    }
//  }
}