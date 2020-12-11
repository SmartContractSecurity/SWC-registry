# Title 
Constant Functions Changing the State

## Relationships 
[CWE-664: Improper Control of a Resource Through its Lifetime](https://cwe.mitre.org/data/definitions/664.html)

## Description 
This issue is possible to happen if and only if the Solidity version is prior to `v0.5.0`, since `constant`/`pure`/`view` was not enforced prior to `v0.5.0`. Starting from `v0.5.0`, a call to a `constant`/`pure`/`view` function uses the `STATICCALL` opcode, which will `revert` in case of state modification.

## Remediation
Ensure the attributes of contracts compiled prior to `v0.5.0` are correct.

## References 
* [Interoperability With Older Contracts](https://docs.soliditylang.org/en/develop/050-breaking-changes.html#interoperability-with-older-contracts)
