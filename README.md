# This registry is no longer actively maintained

This registry has not been significantly updated since 2020, and is no longer actively maintained. While some maintenance may be done
to enhance or clarify the status of the current content, and pointers will be added to new work that is maintained such as the 
[EEA EthTrust Security Levels Specification](https://entethalliance.org/specs/ethtrust-sl/), new SWCs are no longer being added,
and readers should check external sources to clarify the relevance of existing content.

# Smart Contract Weakness Classification Registry

The Smart Contract Weakness Classification Registry (SWC Registry) is an implementation of the weakness classification scheme proposed in [EIP-1470](https://github.com/ethereum/EIPs/issues/1469). It is loosely aligned to the terminologies and structure used in the Common Weakness Enumeration ([CWE](https://cwe.mitre.org)) while overlaying a wide range of weakness variants that are specific to smart contracts.

The goals of this project are as follows:

- Provide a straightforward way to classify security issues in smart contract systems.
- Define a common language for describing security issues in smart contract systems' architecture, design, or code.
- Serve as a way to train and increase performance for smart contract security analysis tools.

## New SWC entries are not added since 2020


### Scope of Weaknesses

SWCs aree concerned with weaknesses that can be identified within Solidity code of a smart contract.
Weaknesses in 'smart contract adjacent' code are not be included. 
For example, the [gas siphoning attack](https://github.com/SmartContractSecurity/SWC-registry/pull/140) occurs in wallet code,
and should be protected against in wallet code.
