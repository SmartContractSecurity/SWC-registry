/*
 * @source: https://consensys.github.io/smart-contract-best-practices/recommendations/#avoid-using-txorigin
 * @author: Consensys Diligence
 * Modified by Gerhard Wagner
 */

pragma solidity 0.4.25;

contract MyContract {

    address owner;

    function MyContract() public {
        owner = msg.sender;
    }

    function sendTo(address receiver, uint amount) public {
      require(msg.sender == owner);
      receiver.transfer(amount);
    }

}
