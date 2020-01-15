/*
 * @author: Kaden Zipfel
 */

pragma solidity ^0.5.0;

contract TimeLock {
    struct User {
        uint amount; // amount locked (in eth)
        uint unlockBlock; // minimum block to unlock eth
    }

    mapping(address => User) private users;

    // Tokens should be locked for exact time specified
    function lockEth(uint _time, uint _amount) public payable {
        require(msg.value == _amount, 'must send exact amount');
        users[msg.sender].unlockBlock = block.number + (_time / 14);
        users[msg.sender].amount = _amount;
    }

    // Withdraw tokens if lock period is over
    function withdraw() public {
        require(users[msg.sender].amount > 0, 'no amount locked');
        require(block.number >= users[msg.sender].unlockBlock, 'lock period not over');

        uint amount = users[msg.sender].amount;
        users[msg.sender].amount = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success, 'transfer failed');
    }
}
