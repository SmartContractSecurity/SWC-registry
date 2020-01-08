/*
 * @source: https://github.com/yahgwai/rps
 * @author: Chris Buckland
 * Modified by Kaden Zipfel
 */

pragma solidity ^0.5.0;

contract OddEven {
    enum Stage {
        FirstCommit,
        SecondCommit,
        FirstReveal,
        SecondReveal,
        Distribution
    }

    struct Player {
        address addr;
        bytes32 commitment;
        uint number;
    }

    Player[2] private players;
    Stage public stage = Stage.FirstCommit;

    function play(bytes32 commitment) public payable {
        // Only run during commit stages
        uint playerIndex;
        if(stage == Stage.FirstCommit) playerIndex = 0;
        else if(stage == Stage.SecondCommit) playerIndex = 1;
        else revert("only two players allowed");

        // Require proper amount deposited
        // 1 ETH as a bet + 1 ETH as a bond
        require(msg.value == 2 ether, 'msg.value must be 2 eth');

        // Store the commitment
        players[playerIndex] = Player(msg.sender, commitment, 0);

        // Move to next stage
        if(stage == Stage.FirstCommit) stage = Stage.SecondCommit;
        else stage = Stage.FirstReveal;
    }

    function reveal(uint number, bytes32 blindingFactor) public {
        // Only run during reveal stages
        require(stage == Stage.FirstReveal || stage == Stage.SecondReveal, "wrong stage");

        // Find the player index
        uint playerIndex;
        if(players[0].addr == msg.sender) playerIndex = 0;
        else if(players[1].addr == msg.sender) playerIndex = 1;
        else revert("unknown player");

        // Check the hash to prove the player's honesty
        require(keccak256(abi.encodePacked(msg.sender, number, blindingFactor)) == players[playerIndex].commitment, "invalid hash");

        // Update player number if correct
        players[playerIndex].number = number;

        // Move to next stage
        if(stage == Stage.FirstReveal) stage = Stage.SecondReveal;
        else stage = Stage.Distribution;
    }

    function distribute() public {
        // Only run during distribution stage
        require(stage == Stage.Distribution, "wrong stage");

        // Find winner
        uint n = players[0].number + players[1].number;

        // Payout winners winnings and bond
        players[n%2].addr.call.value(3 ether)("");

        // Payback losers bond
        players[(n+1)%2].addr.call.value(1 ether)("");

        // Reset the state
        delete players;
        stage = Stage.FirstCommit;
    }
}
