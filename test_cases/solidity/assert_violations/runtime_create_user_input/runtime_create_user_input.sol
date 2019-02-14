/*
 * @source: ChainSecurity
 * @author: Anton Permenev
 */
pragma solidity ^0.4.22;

contract RuntimeCreateUserInput{

    function check(uint x){
        B b = new B(x);
        assert(b.foo() == 10);
    }

}

contract B{

    uint x_;
    constructor(uint x){
        x_ = x;
    }

    function foo() returns(uint){
        return x_;
    }

}

