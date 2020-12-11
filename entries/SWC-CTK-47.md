# Title 
External Calls inside Loops

## Relationships 
[CWE-670: Always-Incorrect Control Flow Implementation](https://cwe.mitre.org/data/definitions/670.html)

## Description 
Function calls inside one loop will be broadcasted in the same transaction, which means a revert of any one of the calls will revert the whole loop, leading to a DOS. 

## Remediation
Apply the [Pull Over Push Pattern](https://fravoll.github.io/solidity-patterns/pull_over_push.html) for external calls.

## References 
* [Ethereum Design Rationale](https://github.com/ethereum/wiki/wiki/Design-Rationale#gas-and-fees)
* [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)
* [Pull Over Push Pattern](https://fravoll.github.io/solidity-patterns/pull_over_push.html)
