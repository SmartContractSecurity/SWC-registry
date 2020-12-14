# Title 
Boolean Constant Misuse

## Relationships 
[CWE-670: Always-Incorrect Control Flow Implementation](https://cwe.mitre.org/data/definitions/670.html)

## Description 
Detection of the misuse of a Boolean constant. Boolean constants in code have only a few legitimate uses. Other uses (in complex expressions, as conditionals) indicate either an error or, most likely, the persistence of faulty code.

## Remediation
Verify and simplify the condition.

## References 
* [Solidity Types](https://docs.soliditylang.org/en/v0.5.3/types.html#booleans)
