pragma solidity ^0.4.22;

contract TwoMappings{

    mapping(uint=>uint) m;
    mapping(uint=>uint) n;

    constructor(){
        m[10] = 100;
    }

    function check(uint a){
        assert(n[a] == 0);
    }

}

