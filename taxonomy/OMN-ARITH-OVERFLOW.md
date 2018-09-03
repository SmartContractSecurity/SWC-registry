# Title 
Integer Overflow and Underflow

## Description 
An overflow/underflow happens when an arithmetic operation reaches the maximum or minimum size of a type. For instance if a number is stored in the uint8 type, it means that the number is stored in a 8 bits unsigned number ranging from 0 to 2^8-1. In computer programming, an integer overflow occurs when an arithmetic operation attempts to create a numeric value that is outside of the range that can be represented with a given number of bits – either larger than the maximum or lower than the minimum representable value.

## Remediation
It is recommended to use vetted safe math libraries for arithmetic operations consistently throughout the smart contract system. 

## Severity 
Critical  

## References 
[Ethereum Smart Contract Best Practices - Integer Overflow and Underflow](https://consensys.github.io/smart-contract-best-practices/known_attacks/#integer-overflow-and-underflow)
