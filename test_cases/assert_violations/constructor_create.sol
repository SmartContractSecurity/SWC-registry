/*
 * @source: ChainSecurity
 * @author: Anton Permenev
 */

pragma solidity ^0.4.19;

contract ConstructorCreate{
    B b = new B();

    function check(){
        assert(b.foo() == 10);
    }

}

contract B{

    function foo() returns(uint){
        return 11;
    }
}
