# Please note, this content is no longer actively maintained.

The content of the SWC registry has not been thoroughly updated since 2020. It is known to be incomplete and may contain errors as well as crucial omissions.

For currently maintained guidance on known Smart Contract vulnerabilities written primarily as guidance for security reviewers, please see the
[EEA EthTrust Security Levels specification](https://entethalliance.org/specs/ethtrust-sl). As well as the latest release version, an
[Editor's draft](https://entethalliance.github.io/eta-registry/security-levels-spec.html) is available, that represents the latest work of the group developing the specification.

General guidance for developers on what to consider to ensure security, that is currently maintained, is also available through the 
[Smart Contract Security Verification Standard (SCSVS)](https://github.com/ComposableSecurity/SCSVS).

# Title

Right-To-Left-Override control character (U+202E)

## Relationships

[CWE-451: User Interface (UI) Misrepresentation of Critical Information](http://cwe.mitre.org/data/definitions/451.html)


## Description

Malicious actors can use the Right-To-Left-Override unicode character to force RTL text rendering and confuse users as to the real intent of a contract.

## Remediation

There are very few legitimate uses of the U+202E character. It should not appear in the source code of a smart contract.

## References

- [Outsmarting Smart Contracts](https://youtu.be/P_Mtd5Fc_3E?t=1813)

EEA EthTrust Security Levels specification:

- [**[S] No Unicode Direction Control Characters**](https://entethalliance.org/specs/ethtrust-sl/#req-1-unicode-bdo)
- [**[M] No Unnecessary Unicode Controls**](https://entethalliance.org/specs/ethtrust-sl/#req-2-unicode-bdo)
- [**[M] No Homoglyph-style Attack**](https://entethalliance.org/specs/ethtrust-sl/#req-2-no-homoglyph-attack)

## Samples

### guess_the_number.sol

```solidity
/*
 * @source: https://youtu.be/P_Mtd5Fc_3E
 * @author: Shahar Zini
 */
pragma solidity ^0.5.0;

contract GuessTheNumber
{
    uint _secretNumber;
    address payable _owner;
    event success(string);
    event wrongNumber(string);

    constructor(uint secretNumber) payable public
    {
        require(secretNumber <= 10);
        _secretNumber = secretNumber;
        _owner = msg.sender;
    }

    function getValue() view public returns (uint)
    {
        return address(this).balance;
    }

    function guess(uint n) payable public
    {
        require(msg.value == 1 ether);

        uint p = address(this).balance;
        checkAndTransferPrize(/*The prize‮/*rebmun desseug*/n , p/*‭
		        /*The user who should benefit */,msg.sender);
    }

    function checkAndTransferPrize(uint p, uint n, address payable guesser) internal returns(bool)
    {
        if(n == _secretNumber)
        {
            guesser.transfer(p);
            emit success("You guessed the correct number!");
        }
        else
        {
            emit wrongNumber("You've made an incorrect guess!");
        }
    }

    function kill() public
    {
        require(msg.sender == _owner);
        selfdestruct(_owner);
    }
}
```

#### Comments

The line

```
checkAndTransferPrize(/*The prize‮/*rebmun desseug*/n , p/*
```

inside the function `guess(uint n)` uses invisible direction control characters, so what is present on the screen misrepresents the order
of the parameters - the function is called with parameters `n, p, address`, which is the **logical order** of characters,
but some are displayed from right to left, so that the segment 'n, p' appears in reverse order to a reader, 
because invisible direction control characters are included in the code.

Selecting the text character by character will usually show this - the selection suddenly jumps to the end of the right-to-left text,
and starts to extend from the right hand side leftward. It is also possible to check for the unicode characters explicitly in the content.
