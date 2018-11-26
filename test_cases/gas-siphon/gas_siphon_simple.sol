pragma solidity ^0.4.25;

//This tokens requires that all users be contract with identifiable users
contract IdentityToken{
    mapping(address => bytes32) identies;
    mapping(address => uint256) balances;

    function transfer(address _to, uint256 _amount) external {
        require(balances[msg.sender] >= _amount); //Make sure the caller can send _amount tokens

        balances[_to] += _amount;
        balances[msg.sender] -= _amount; //Set balances before call to avoid reentrancy

        bytes32 id = verifable(_to).verify(); //Call contract to check if it has a compliant method
        require(id != 0x0); //Require that the method has a meaningful id
        identies[_to] = id; //Set the id
    }
}

interface verifable{
    function verify() external returns(bytes32);
}
