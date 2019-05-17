pragma solidity >=0.4.24;

import "./unused_state_variables.sol";

contract DerivedA is UnusedStateVariables {
    // overrides e of UnusedStateVariables (unused_state_variables.sol)
    int e = 100;

    // f is not used in current contract or any descendant contracts
    int internal f = 500;

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
