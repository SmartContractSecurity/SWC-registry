pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

contract Base {
    // a and b are public and can be accessed through an external call
    int public a = 10;
    int public b;

    // c and d are not used in current contract or descendant contract
    int internal c;
    int private d;

    // e is assigned and accessed in assign1
    int public e;
    
    // f can never be accessed 
    mapping (uint => uint) f;
    
    // g is assigned per default and is accessed in descendant contract
    uint[] g=[1,2,3];

    struct A { uint a; }
    
    function assign1(int x) public {
        e += x;
    }

    function assign2(uint x,uint y) public {
        f[x] = y;
    }

}
    