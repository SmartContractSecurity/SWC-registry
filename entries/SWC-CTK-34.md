# Title 
Incorrect ERC721 Interfaces

## Relationships 
[CWE-1076: Insufficient Adherence to Expected Conventions](https://cwe.mitre.org/data/definitions/1076.html)

## Description 
Incorrect return values for ERC721 functions. A contract compiled with Solidity version later than `v0.4.22` interacting with these functions will fail to execute them, as the return value is missing.

## Remediation
Set the appropriate return values and value types for the defined ERC721 functions.

## References 
* [EIP-721](https://eips.ethereum.org/EIPS/eip-721)
