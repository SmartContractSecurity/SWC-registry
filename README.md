# Smart Contract Weakness Classification Registry

The Smart Contract Weakness Classification Registry (SWC Registry) is an implementation of the weakness classification scheme proposed in [EIP-1470](https://github.com/ethereum/EIPs/issues/1469). It is loosely aligned to the terminologies and structure used in the Common Weakness Enumeration ([CWE](https://cwe.mitre.org)) while overlaying a wide range of weakness variants that are specific to smart contracts.

The goals of this project are as follows:

- Provide a straightforward way to classify security issues in smart contract systems.
- Define a common language for describing security issues in smart contract systems' architecture, design, or code.
- Serve as a way to train and increase performance for smart contract security analysis tools.

## Create a new SWC entry

Make sure that there is no matching weakness in the registry. Create a file with a new SWC ID in the [entries](./entries) directory. Use the template and describe all weakness attributes.

```
# Title

Pick a meaningful title.

## Relationships

Link a CWE Base or Class type to the CWS variant.
e.g.  [CWE-682: Incorrect Calculation](https://cwe.mitre.org/data/definitions/682.html)

## Description

Describe the nature and potential impact of the weakness on the contract system.

## Remediation

Describe ways on how to fix the weakness.

## References

Link to external references that contain useful additional information on the issue.

## Samples

Example Solidity code with unfixed and fixed variants.
```

Make sure the credit the author and mention the source if you don't write the contract sample yourself.

```
/*
 * @source: <link>
 * @author: <name>
 */
```

### Scope of Weaknesses

SWCs should be concerned with weaknesses that can be identified within the code of a smart contract, typically Solidity.
Weaknesses in 'smart contract adjacent' code should not be included. For example, the [gas siphoning attack](https://github.com/SmartContractSecurity/SWC-registry/pull/140) occurs in wallet code, and should be protected against in wallet code.
