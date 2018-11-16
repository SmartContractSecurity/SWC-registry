pragma solidity ^0.4.24;

//Use the fallback to put in funds to pay the oracle and call oracle to get the information
contract PayOracle{
  address Oracle;
  bytes result;

  //We have fixed the problem by requiring that the oracle be funded directly
  function askTheOracle() public payable returns(bytes){
    require(msg.value > 1);
    Oracle.send(1);
  }
  function callback(bytes _result) public{
    require(msg.sender == Oracle);
    result = _result;
  }

  function () public payable{}
}
