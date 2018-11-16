
/*
 * @source: https://capturetheether.com/challenges/lotteries/guess-the-random-number/
 * @author: Steve Marx
 */

pragma solidity ^0.4.21;

contract GuessTheRandomNumberChallenge {
    uint8 answer;
    modifier onlyHumans() {
      require(msg.sender == tx.origin, "Sorry no Contracts");
      _;
    }

    function GuessTheRandomNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    //By restricting this function to humans we prevent the guess from being determined in the execution context of a single call/block
    //Which prevents someone from always guessing correctly, this is still vulnerable to minner manipulation though
    function guess(uint8 n) onlyHumans() public payable {
        require(msg.value == 1 ether);
        //Since information on the blockchain is public we need to recalculate for each guess
        answer = uint8(keccak256(block.blockhash(block.number - 1), now));

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}
