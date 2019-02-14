//Single transaction overflow
//Post-transaction effect: overflow escapes to publicly-readable storage
//Safe version

pragma solidity ^0.4.19;

contract IntegerOverflowMul {
    uint public count = 2;

    function run(uint256 input) public {
        count = mul(count, input);
    }

    //from SafeMath
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
      // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
      // benefit is lost if 'b' is also tested.
      // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
      if (a == 0) {
        return 0;
      }

      uint256 c = a * b;
      require(c / a == b);

      return c;
    }
}
