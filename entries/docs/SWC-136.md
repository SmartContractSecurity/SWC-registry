# Please note, this content is no longer actively maintained.

The content of the SWC registry has not been thoroughly updated since 2020. It is known to be incomplete and may contain errors as well as crucial omissions.

For currently maintained guidance on known Smart Contract vulnerabilities written primarily as guidance for security reviewers, please see the
[EEA EthTrust Security Levels specification](https://entethalliance.org/specs/ethtrust-sl). As well as the latest release version, an
[Editor's draft](https://entethalliance.github.io/eta-registry/security-levels-spec.html) is available, 
that represents the latest work of the group developing the specification.

General guidance for developers on what to consider to ensure security, that is currently maintained, is also available through the 
[Smart Contract Security Verification Standard (SCSVS)](https://github.com/ComposableSecurity/SCSVS).

# Title

Unencrypted Private Data On-Chain

## Relationships

[CWE-767: Access to Critical Private Variable via Public Method](https://cwe.mitre.org/data/definitions/767.html)

## Description

It is a common misconception that `private` type variables cannot be read. Even if your contract is not published, attackers can look at contract transactions to determine values stored in the state of the contract. For this reason, it's important that unencrypted private data is not stored in the contract code or state.

## Remediation

Any private data should either be stored off-chain, or carefully encrypted.

## References

- [Keeping secrets on Ethereum](https://medium.com/solidified/keeping-secrets-on-ethereum-5b556c3bb1ee)
- [A Survey of Attacks on Ethereum Smart Contracts (SoK)](https://www.semanticscholar.org/paper/A-Survey-of-Attacks-on-Ethereum-Smart-Contracts-Atzei-Bartoletti/aec843c0f38aff6c7901391a75ec10114a3d60f8)
- [Unencrypted Secrets](https://github.com/KadenZipfel/smart-contract-attack-vectors/blob/master/vulnerabilities/unencrypted-secrets.md)
- [Stack Overflow - Decrypt message on-chain](https://ethereum.stackexchange.com/questions/69825/decrypt-message-on-chain)

## Samples

### odd_even.sol

```solidity
/*
 * @source: https://gist.github.com/manojpramesh/336882804402bee8d6b99bea453caadd#file-odd-even-sol
 * @author: https://github.com/manojpramesh
 * Modified by Kaden Zipfel
 */

pragma solidity ^0.5.0;

contract OddEven {
    struct Player {
        address addr;
        uint number;
    }

    Player[2] private players;
    uint count = 0;

    function play(uint number) public payable {
            require(msg.value == 1 ether, 'msg.value must be 1 eth');
            players[count] = Player(msg.sender, number);
            count++;
            if (count == 2) selectWinner();
    }

    function selectWinner() private {
            uint n = players[0].number + players[1].number;
            (bool success, ) = players[n%2].addr.call.value(address(this).balance)("");
            require(success, 'transfer failed');
            delete players;
            count = 0;
    }
}
```

#### Comments

The vulnerable version above requires the players to send the number they are using
as part of the transaction.
This means the first player's number will be visible, allowing the second player to select a number
that they know will make them a winner.
(This assumption is simplistic to illustrate - there are also possibilities to front-run players,
among other potential issues).

In the fixed version below, the players instead submit a commitment that obfuscates their number,
and only subsequently reveal that they know the secret to set in train the process of a payout.

### odd_even_fixed.sol

```solidity
/*
 * @source: https://github.com/yahgwai/rps
 * @author: Chris Buckland
 * Modified by Kaden Zipfel
 * Modified by Kacper Żuk
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
        bool revealed;
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
        players[playerIndex] = Player(msg.sender, commitment, false, 0);

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

        // Protect against double-reveal, which would trigger move to Stage.Distribution too early
        require(!players[playerIndex].revealed, "already revealed");

        // Check the hash to prove the player's honesty
        require(keccak256(abi.encodePacked(msg.sender, number, blindingFactor)) == players[playerIndex].commitment, "invalid hash");

        // Update player number if correct
        players[playerIndex].number = number;

        // Protect against double-reveal
        players[playerIndex].revealed = true;

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

```
