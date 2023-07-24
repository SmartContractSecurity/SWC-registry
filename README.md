# This registry is no longer actively maintained

This registry has not been significantly updated since 2020, and is no longer actively maintained. While some maintenance may be done
to enhance or clarify the status of the current content, and pointers will be added to new work that is maintained such as the 
[EEA EthTrust Security Levels Specification](https://entethalliance.org/specs/ethtrust-sl/), new SWCs are no longer being added,
and readers should check external sources to clarify the relevance of existing content.

All the work in here was incorporated into the **[EEA EthTrust Security Levels specification v1](https://entethalliance.org/specs/ethtrust-sl)**. 

The [EEA EthTrust Security Levels](https://entethalliance.org/groups/ethtrust) project is actively maintained. 
The **[Editor's draft for a new version](https://entethalliance.github.io/eta-registry/security-levels-spec.html)** is publicly available,
is updated roughly every two weeks, and a formal release is expected to be published in Q4 2023 as version 2 of the specification.

# Smart Contract Weakness Classification Registry

The Smart Contract Weakness Classification Registry (SWC Registry) is an implementation of the weakness classification scheme proposed in [EIP-1470](https://github.com/ethereum/EIPs/issues/1469). It is loosely aligned to the terminologies and structure used in the Common Weakness Enumeration ([CWE](https://cwe.mitre.org)) while overlaying a wide range of weakness variants that are specific to smart contracts.

The goals of this project are as follows:

- Provide a straightforward way to classify security issues in smart contract systems.
- Define a common language for describing security issues in smart contract systems' architecture, design, or code.
- Serve as a way to train and increase performance for smart contract security analysis tools.

## New SWC entries are not added since 2020


### Scope of Weaknesses

SWCs are concerned with weaknesses that can be identified within Solidity code of a smart contract.
Weaknesses in 'smart contract adjacent' code are not covered by this registry of Weaknesses. 
For example, the [gas siphoning attack](https://github.com/SmartContractSecurity/SWC-registry/pull/140) occurs in wallet code,
and should be protected against in wallet code.
