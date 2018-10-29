pragma solidity ^0.4.24;

contract ReturnValue {

  address callee = 0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef;

  function callchecked() public {
  	require(callee.call());
  }

  function callnotchecked() public {
    callee.call();
  }
}
