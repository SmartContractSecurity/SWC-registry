# Title 
Duplicate Contract Name

## Relationships 
[CWE-694: Use of Multiple Resources with Duplicate Identifier](https://cwe.mitre.org/data/definitions/694.html)

## Description 
In the same codebase, if there are two contracts having the same contract name, the compilation artifacts will not contain one of the contracts with the duplicate name. In the other word, only one of the two contracts will be compiled and the other contract cannot be analyzed.

## Remediation
Rename the contracts with duplicate names to be different.

## References 
* [Solidity Contracts](https://docs.soliditylang.org/en/latest/contracts.html#contracts)
