pragma solidity ^0.4.25;

contract Bank {
    mapping (address => uint) balance;
    
    function deposit() payable public {
        balance[msg.sender] += msg.value;
    }
    
    function withdraw(uint amount) public {
        balance[msg.sender] -= amount;
        msg.sender.transfer(amount);
    }
}
