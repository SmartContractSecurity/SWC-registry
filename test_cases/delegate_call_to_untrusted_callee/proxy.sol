pragma solidity ^0.4.24;

contract Proxy {

  address callee;

  constructor() {
  	callee = address(0x0);
  }

  function setCallee(address newCallee) public {
  	callee = newCallee;
  }

  function forward(address callee, bytes _data) public {
    require(callee.delegatecall(_data));
  }

}
