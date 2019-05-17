pragma solidity >=0.4.24;

contract UnusedStateVariables {
    // a is used via accessor in contract SideUsage
    int public a = 10;

    // b, c and d are not used in current contract or any descendant contracts
    int public b;
    int internal c;
    int private d;

    // e is overriden in DerivedA - original e (current) is not used here and anywhere else in this sample
    int e;

    // x is referenced locally
    int private x;

    // y is referenced in contract DerivedA
    int internal y;

    // z is referenced in contract DerivedB
    int z;

    constructor() public {
        x = 2;
    }
}

contract DerivedA is UnusedStateVariables {
    int e = 100;

    function test() public {
        y = e;
    }
}

contract DerivedB is DerivedA {
    function test() public {
        super.test();

        z = 3;
    }
}

contract SideUsage {
    function test(UnusedStateVariables example) public view returns (int) {
        return example.a();
    }
}
