/*
 * @source: ChainSecurity
 * @author: Anton Permenev
 */
pragma solidity ^0.4.19;

contract RuntimeUserInputCall{

    function check(address b){
        assert(B(b).foo() == 10);
    }

}

contract B{
    function foo() returns(uint);
}
