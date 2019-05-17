pragma solidity >=0.4.24;

contract UnusedStateVariablesFixed {
    int public a = 10;
    int private x;
    int internal y;
    int z;

    constructor() public {
        x = 2;
    }
}
