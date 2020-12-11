# Title 
Reentrancy without Theft of Ethers

## Relationships 
[CWE-841: Improper Enforcement of Behavioral Workflow](https://cwe.mitre.org/data/definitions/841.html)

## Description 
One of the major dangers of calling external contracts is that they can take over the control flow. In the reentrancy attack (a.k.a. recursive call attack), a malicious contract calls back into the calling contract before the first invocation of the function is finished. This may cause the different invocations of the function to interact in undesirable ways.

This issue only reports reentrancies that do not have risk of losing Ethers.

## Remediation
The best practices to avoid Reentrancy weaknesses are: 

- Make sure all internal state changes are performed before the call is executed. This is known as the [Checks-Effects-Interactions pattern](https://solidity.readthedocs.io/en/latest/security-considerations.html#use-the-checks-effects-interactions-pattern)
- Use a reentrancy lock (ie.  [OpenZeppelin's ReentrancyGuard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol).

## References 
* [Ethereum Smart Contract Best Practices - Reentrancy](https://consensys.github.io/smart-contract-best-practices/known_attacks/#reentrancy)
