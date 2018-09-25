/*
 * @source: https://github.com/ConsenSys/evm-analyzer-benchmark-suite
 * @author: Suhabe Bugrara
 */

pragma solidity ^0.4.19;

contract AssertMultiTx1 {
    uint256 private param;

    function AssertMultiTx1(uint256 _param) public {
        require(_param > 0);
        param = _param;
    }

    function run() {
        assert(param > 0);
    }

}
