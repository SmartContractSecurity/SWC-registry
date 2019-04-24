pragma solidity 0.4.25;

contract DeprecatedVar {
    function useVar() public view {
        var a = [1,2,3];

        var (x, y, z) = (false, "test", 0);
    }
}
