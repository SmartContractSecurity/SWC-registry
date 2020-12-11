# Title 
Built-in Symbol Shadowing

## Relationships 
[CWE-710: Improper Adherence to Coding Standards](https://cwe.mitre.org/data/definitions/710.html)

## Description 
Detection of shadowing using built-in symbols. For example, built-in symbols include variables `now`, `block`, `msg`, etc., and functions `require()`, `keccak256()`, etc. The list of built-in symbols can be found at [Special Variables and Functions](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#special-variables-and-functions).

## Remediation
Rename the variables or functions that shadow the built-in components.

## References 
* [CertiK.io](https://certik.io)
* [Special Variables and Functions](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#special-variables-and-functions)