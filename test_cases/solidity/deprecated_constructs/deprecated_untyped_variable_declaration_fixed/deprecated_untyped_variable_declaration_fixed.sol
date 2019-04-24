pragma solidity 0.4.25;

contract DeprecatedVarFixed {
    function useVar() public view {
        uint8[3] memory a = [1,2,3];

        (bool x, string memory y, uint8 z) = (false, "test", 0);
    }
}
