pragma solidity >=0.4.24;

import "./base_fixed.sol";

contract DerivedAFixed is BaseFixed {
    int e = 100;

    function test() public {
        y = e;
    }
}

contract DerivedB is DerivedAFixed {
    function test() public {
        super.test();

        z = 3;
    }
}

contract SideUsage {
    function test(BaseFixed example) public view returns (int) {
        return example.a();
    }
}
