pragma solidity >=0.4.24;

import "./unused_state_variables_fixed.sol";

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
