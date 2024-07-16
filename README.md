# This registry is no longer actively maintained

This registry has not been significantly updated since 2020, and is no longer actively maintained. While some maintenance may be done
to enhance or clarify the status of the current content, and pointers will be added to new work that is maintained such as the 
[EEA EthTrust Security Levels Specification](https://entethalliance.org/specs/ethtrust-sl/), new SWCs are no longer being added,
and readers should check external sources to clarify the relevance of existing content.

All the vulnerabilities described in this repository were incorporated into version 1 of the **[EEA EthTrust Security Levels specification](https://entethalliance.org/specs/ethtrust-sl)**, published in August 2022

The [EEA EthTrust Security Levels](https://entethalliance.org/groups/ethtrust) project is actively maintained. 
The **[Editor's draft for a new version](https://entethalliance.github.io/eta-registry/security-levels-spec.html)** is publicly available.

[EthTrust Security Leveles Version 2](https://entethalliance.org/specs/ethtrust-sl/v2) was published in December 2023, with publication of version 3 expected in early 2025.

Another project that has been maintained over a number of years is the [Smart Contract Security Verification Standard](https://github.com/ComposableSecurity/SCSVS).

The EthTrust specification is specific to Solidity code, and aims to comprehensively identify vulnerabilities that need to be checked for, and if present eliminated. The SCSVS is a more general development guideline for security testing and remediation, applicable to a large range of projects.

# Smart Contract Weakness Classification Registry

The Smart Contract Weakness Classification Registry (SWC Registry) is an implementation of the weakness classification scheme proposed in [EIP-1470](https://github.com/ethereum/EIPs/issues/1469). It is loosely aligned to the terminologies and structure used in the Common Weakness Enumeration ([CWE](https://cwe.mitre.org)) while overlaying a wide range of weakness variants that are specific to smart contracts.

The goals of this project were as follows:

- Provide a straightforward way to classify security issues in smart contract systems.
- Define a common language for describing security issues in smart contract systems' architecture, design, or code.
- Serve as a way to train and increase performance for smart contract security analysis tools.

## New SWC entries have not not been added since 2020


### Scope of Weaknesses

SWCs are concerned with weaknesses that can be identified within Solidity code of a smart contract.
Weaknesses in 'smart contract adjacent' code are not covered by this registry of Weaknesses. 
For example, the [gas siphoning attack](https://github.com/SmartContractSecurity/SWC-registry/pull/140) occurs in wallet code,
and should be protected against in wallet code.
