# Title 
Unchecked Send

## Relationships 
[CWE-252: Unchecked Return Value](https://cwe.mitre.org/data/definitions/252.html)

## Description 
The return value of `send` is not checked, so if the `send` fails, the Ether will be locked in the contract. If `send` is used to prevent blocking operations, consider logging the failed `send`.

## Remediation
Ensure that the return value of `send` is checked or logged. 

## References 
* [CertiK.io](https://certik.io)
