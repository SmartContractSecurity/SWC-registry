# Title 
Uninitialized Local Variables

## Relationships 
[CWE-665: Improper Initialization](https://cwe.mitre.org/data/definitions/665.html)

## Description 
When a resource has not been properly initialized, the smart contract may behave unexpectedly. This may lead to a crash or invalid memory access, but the consequences vary depending on the type of resource and how it is used within the contract.

## Remediation
Initialize all the variables. If a variable is meant to be initialized to zero, explicitly set it to zero.

## References 
* [Solidity List of Know Bugs](https://docs.soliditylang.org/en/latest/bugs.html?highlight=uninitialized#list-of-known-bugs)
