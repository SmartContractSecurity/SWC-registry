# Title
Improper Input Validation

## Relationships
[CWE-20: Improper Input Validation](https://cwe.mitre.org/data/definitions/20.html)

## Description
Addresses in Smart Contracts are essential variables. It might be owner/governance contract account or the destination of cash flow. When state variables are typeof address, it might be assigned in declaration, constructor, initializer, setter functions, etc. If the functions having access to update the addresses do not properly handle the validation of input, the essential variables might be set to dead addresses like `0x0` or `0xDEAD`.

## Remediation
Leverage `require` or `assert` statement to check the input data are valid.

## References
* [Solidity Documentation](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-8)
