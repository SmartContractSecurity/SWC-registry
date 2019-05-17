pragma solidity ^0.4.20;

contract UnusedVariablesFixed {
    int a = 1;

    function unusedArg(int x) public view returns (int z) {
        z = x + a;
    }

    function unusedReturn(int x, int y) public pure returns (int m) {
        m = y - x;
    }

    function neverAccessed(int test) public pure returns (int) {
        int z = 10;

        if (test > z) {
            int x = test - z;

            return x;
        }

        return z;
    }
}
