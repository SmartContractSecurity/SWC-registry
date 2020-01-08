pragma solidity ^0.4.22;

contract SimpleSuicide {

  function sudicideAnyone() {
    selfdestruct(msg.sender);
  }

}
