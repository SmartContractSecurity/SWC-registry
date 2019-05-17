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

contract DerivedA is UnusedStateVariablesFixed {
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
    function test(UnusedStateVariablesFixed example) public view returns (int) {
        return example.a();
    }
}
