pragma solidity 0.5.11;

contract UnusedCode {
    uint256 x;

    function get() external view returns (uint256) {
        return x;
    }

    function set(uint256 a) external {
        x = a;
    }

    function secretSet() internal {
        x = 100;
    }
}
