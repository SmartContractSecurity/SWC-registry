/*
 * @source: https://github.com/ConsenSys/evm-analyzer-benchmark-suite
 * @author: Suhabe Bugrara
 */

//Single transaction overflow
//Post-transaction effect: overflow escapes to publicly-readable storage

pragma solidity ^0.4.23;

contract IntegerOverflowSingleTransaction {
    uint public count = 1;

    // ADD overflow with result stored in state variable.
    function overflowaddtostate(uint256 input) public {
        count += input;
    }

    // MUL overflow with result stored in state variable.
    function overflowmultostate(uint256 input) public {
        count *= input;
    }

    // Underflow with result stored in state variable.
    function underflowtostate(uint256 input) public {
        count -= input;
    }

    // ADD Overflow, no effect on state.
    function overflowlocalonly(uint256 input) public {
        uint res = count + input;
    }

    // MUL Overflow, no effect on state.
    function overflowmulocalonly(uint256 input) public {
        uint res = count * input;
    }

    // Underflow, no effect on state.
    function underflowlocalonly(uint256 input) public {
       	uint res = count - input;
    }

}
