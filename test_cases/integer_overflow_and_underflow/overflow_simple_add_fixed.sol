pragma solidity ^0.4.24;

contract Overflow_Add {
    uint public balance = 1;

    function add(uint256 deposit) public {
        balance = add(balance, deposit);
    }

    //from SafeMath
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      require(c >= a);

      return c;
    }
}
