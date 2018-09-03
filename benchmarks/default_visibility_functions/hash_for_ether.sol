/*
 * @source: https://blog.sigmaprime.io/solidity-security.html
 * @author: SigmaPrime 
 */

 pragma solidity 0.4.19;

contract HashForEther {

    function withdrawWinnings() {
        // Winner if the last 8 hex characters of the address are 0. 
        require(uint32(msg.sender) == 0);
        _sendWinnings();
     }

     function _sendWinnings() {
         msg.sender.transfer(this.balance);
     }
}


