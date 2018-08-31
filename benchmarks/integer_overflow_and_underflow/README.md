# Title
Uint Integer Overflow via addition

## Description
The value of `balance + deposit,` implied by the `+=`, can exceed the maximum value implied that expression's value (`uint`).

## Remediation
It is recommended to use vetted safe math libraries for arithmetic operations consistently throughout the smart contract system.

## Severity
Critical

## References
[Ethereum Smart Contract Best Practices - Integer Overflow and Underflow](https://consensys.github.io/smart-contract-best-practices/known_attacks/#integer-overflow-and-underflow)
