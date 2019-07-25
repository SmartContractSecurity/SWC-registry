pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

contract Base {
    // a and b are public and can be accessed through an external call
    int public a = 10;
    int public b;

    // e is assigned and accessed in assign1
    int public e;
    
    // g is assigned per default and is accessed in descendant contract
    uint[] g=[1,2,3];

    struct A { uint a; }
    
    function assign1(int x) public {
        e += x;
    }

}
    