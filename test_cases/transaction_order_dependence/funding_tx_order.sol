pragma solidity ^0.4.24;

//Use the fallback to put in funds to pay the oracle and call oracle to get the information
contract PayOracle{
  address Oracle;
  bytes result;

  function askTheOracle() public returns(bytes){
    require(address(this).balance > 1);

    Oracle.send(1);
  }
  function callback(bytes _result) public{
    require(msg.sender == Oracle);
    result = _result;
  }

  function () public payable{}
}
//This is a transaction ordering vulnerability as it depends on the person who wants to call the Oracle
//calling the askTheOracle right after they fund the fallback.
