//Single transaction overflow
//Post-transaction effect: overflow never escapes function
//Safe version

pragma solidity ^0.4.19;

contract IntegerOverflowBenign1 {
    uint public count = 1;

    function run(uint256 input) public {
        uint res = sub(count, input);
    }

    //from SafeMath
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);//SafeMath uses assert here
        return a - b;
    }
}
