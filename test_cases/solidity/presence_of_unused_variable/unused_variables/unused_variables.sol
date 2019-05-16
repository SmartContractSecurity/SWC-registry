pragma solidity ^0.4.20;

contract UnusedVariables {
    int a = 1;
    int b;

    // y is not used
    function unusedArg(int x, int y) public pure returns (int z) {
        z = x + 1;
    }

    // n is not used
    function unusedReturn(int x, int y) public pure returns (int m, int n) {
        m = y - x;
    }

    function neverAccessed(int test) public pure returns (int) {
        int z = 10;

        if (test > z) {
            // x is not used
            int x = test - z;

            return test - z;
        }

        return z;
    }
}
