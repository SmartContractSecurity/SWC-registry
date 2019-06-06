pragma solidity ^0.4.20;

contract UnusedVariables {
    int a = 1;

    // b is not used
    int public b;

    // y is not used
    function unusedArg(int x, int y) public view returns (int z) {
        z = x + a;
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
