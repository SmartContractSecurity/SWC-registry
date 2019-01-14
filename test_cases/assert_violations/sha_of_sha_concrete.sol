/*
 * @source: ChainSecurity
 * @author: Anton Permenev
 */
pragma solidity ^0.4.22;

contract ShaOfShaConcrete{

    mapping(bytes32=>uint) m;
    uint b;

    constructor(){
        b = 1;
    }

    function check(uint x){
        assert(m[keccak256(abi.encodePacked(x, "B"))] == 0);
    }

}

