pragma solidity ^0.5.0;

contract UnusedVariables {
    int a = 1;

    function unusedArg(int x) public view returns (int z) {
        z = x + a;  
    }

    // n is not reported it is part of another SWC category
    function unusedReturn(int x, int y) public pure returns (int m, int n,int o) {
        m = y - x;
        o = m/2;
    }

    // x is not accessed 
    function neverAccessed(int test) public pure returns (int) {
        int z = 10;

        if (test > z) {
            return test - z;
        }

        return z;
    }
    
    function tupleAssignment(int p) public returns (int q, int r){
        (q, , r) = unusedReturn(p,2);
        
    }

}
