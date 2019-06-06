pragma solidity >=0.4.24;

contract Base {
    // a is used via accessor in contract SideUsage (derived.sol)
    int public a = 10;

    // b, c and d are not used in current contract or any descendant contracts
    int public b;
    int internal c;
    int private d;

    // e is overriden in DerivedA - original e (current) is not used here and anywhere else in this sample
    int e;

    // x is referenced locally
    int private x;

    // y is referenced in contract DerivedA (derived.sol)
    int internal y;

    // z is referenced in contract DerivedB (derived.sol)
    int z;

    constructor() public {
        x = 2;
    }
}
