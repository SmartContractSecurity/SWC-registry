# Title 
Imprecise Arithmetic Operations Order

## Relationships 
[CWE-682: Incorrect Calculation](https://cwe.mitre.org/data/definitions/682.html)

## Description 
Solidity integer division might truncate. As a result, performing division before multiplication is considered as an imprecise arithmetic operations order, which can sometimes lead to loss of precision.

## Remediation
Ordering multiplication before division.

## References 
* [Solidity Design Patterns: Multiply before Dividing](https://soliditydeveloper.com/solidity-design-patterns-multiply-before-dividing)
* [Solidity Integers](https://docs.soliditylang.org/en/latest/types.html#integers)
