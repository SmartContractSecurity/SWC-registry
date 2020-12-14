# Title 
Deprecated Opcode Used

## Relationships 
[CWE-477: Use of Obsolete Function](https://cwe.mitre.org/data/definitions/477.html)

## Description 
There are obsoleted opcodes are applied in the smart contract opcodes, like `CALLCODE` and `ORIGIN`.
`CALLCODE` was rectified with introducing `DELEGATECALL` ([EIP-7](https://eips.ethereum.org/EIPS/eip-7)).

## Remediation
Replace `CALLCODE` by `DELEGATECALL`.

## References 
* [EIP-2488](https://eips.ethereum.org/EIPS/eip-2488)
* [EIP-7](https://eips.ethereum.org/EIPS/eip-7)
