pragma solidity 0.4.16;

contract PureFunctionReadsState {
    uint256 public statevar;

    function get() public pure returns(uint256) {
        return statevar;
    }

    function set(uint256 x) public {
        statevar = x;
    }
}
