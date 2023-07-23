# Title

Lack of Proper Signature Verification

## Relationships

[CWE-345: Insufficient Verification of Data Authenticity](https://cwe.mitre.org/data/definitions/345.html)

## Description

It is a common pattern for smart contract systems to allow users to sign messages off-chain instead of directly requesting users to do an on-chain transaction because of the flexibility and increased transferability that this provides. Smart contract systems that process signed messages have to implement their own logic to recover the authenticity from the signed messages before they process them further. A limitation for such systems is that smart contracts can not directly interact with them because they can not sign messages. Some signature verification implementations attempt to solve this problem by assuming the validity of a signed message based on other methods that do not have this limitation. An example of such a method is to rely on `msg.sender` and assume that if a signed message originated from the sender address then it has also been created by the sender address. This can lead to vulnerabilities especially in scenarios where proxies can be used to relay transactions.

## Remediation

It is not recommended to use alternate verification schemes that do not require proper signature verification through `ecrecover()`.

## References

- [Consensys Diligence 0x Audit Report - Insecure signature validator](https://github.com/ConsenSys/0x_audit_report_2018-07-23#32-mixinsignaturevalidator-insecure-signature-validator-signaturetypecaller)
