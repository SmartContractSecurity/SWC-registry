pragma solidity 0.4.24;

//We fix the problem by eliminating the declaration which overrides the prefered hardcap.

contract Tokensale {
    //uint hardcap = 10000 ether;

    function Tokensale() {}

    function fetchCap() public constant returns(uint) {
        return hardcap;
    }
}

contract Presale is Tokensale {
    uint hardcap = 1000 ether;
    //If the hardcap variables were both needed we would have to rename one to fix this.
    function Presale() Tokensale() {}
}
