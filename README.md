## This content is not actively maintained 

In large part, the content in this registry is still accurate and useful, but **it has not been significantly updated** since about 2020.

All the work in here was incorporated into the **[EEA EthTrust Security Levels specification v1](https://entethalliance.org/specs/ethtrust-sl)**. 

The [EEA EthTrust Security Levels](https://entethalliance.org/groups/ethtrust) project is actively maintained. 
The **[Editor's draft for a new version](https://entethalliance.github.io/eta-registry/security-levels-spec.html)** is publicly available,
is updated roughly every two weeks, and a formal release is expected to be published in Q4 2023 as version 2 of the specification.

# Smart Contract Weakness Classification Registry

[![CircleCI](https://circleci.com/gh/SmartContractSecurity/SWC-registry/tree/master.svg?style=svg)](https://circleci.com/gh/SmartContractSecurity/SWC-registry/tree/master)
[![Pages](https://img.shields.io/badge/pages-online-blue.svg)](https://smartcontractsecurity.github.io/SWC-registry/)
[![Discord](https://img.shields.io/discord/481002907366588416.svg)](https://discord.gg/qcNvR2r)


The Smart Contract Weakness Classification Registry (SWC Registry) is an implementation of the weakness classification scheme proposed in [EIP-1470](https://github.com/ethereum/EIPs/issues/1469). It is loosely aligned to the terminologies and structure used in the Common Weakness Enumeration ([CWE](https://cwe.mitre.org)) while overlaying a wide range of weakness variants that are specific to smart contracts.

The goals of this project are as follows:

- Provide a straightforward way to classify security issues in smart contract systems.
- Define a common language for describing security issues in smart contract systems' architecture, design, or code.
- Serve as a way to train and increase performance for smart contract security analysis tools.

## Contributing

### Create a new SWC entry

Because this content is no longer actively maintained, there is little point submitting new entries to the registry.

Instead, please consider contributing to an active and up to date project such as the [EEA EthTrust Security Levels WG](https://entethalliance.org/groups/ethtrust)'s [EEA EthTrust Security Levels specification Editor's draft for a new version](https://entethalliance.github.io/eta-registry/security-levels-spec.html) 

### Create a new test case  

### New test cases may or may not be reviewed and added, since this repository is no longer actively maintained

(The advice here is retained because it is good advice in general).

Test cases should be as varied as possible and include both simple test cases and real-world samples of vulnerable smart contracts. The test cases are grouped into subdirectories based on a single weakness variant or based on more complex real world contract systems that can contain various weakness variants. A single test case consists of the following structure:

1. A directory that contains all files belonging to a single test case (e.g. [overflow_simple_add](https://github.com/SmartContractSecurity/SWC-registry/blob/master/test_cases/solidity/integer_overflow_and_underflow/overflow_simple_add))
2. One or multiple source files containing issues. Zero issues is valid as well. These test cases demonstrate how a vulnerable test case can be fixed (e.g. [overflow_simple_add.sol](https://github.com/SmartContractSecurity/SWC-registry/blob/master/test_cases/solidity/integer_overflow_and_underflow/overflow_simple_add/overflow_simple_add.sol) and [overflow_simple_add_fixed.sol](https://github.com/SmartContractSecurity/SWC-registry/blob/master/test_cases/solidity/integer_overflow_and_underflow/overflow_simple_add_fixed/overflow_simple_add_fixed.sol)).
3. A single combined JSON file that contains the compilation result for the main source file and its imports. It should at least include the runtime as well as the creation byte code, ASTs, source code mappings and the used compiler version (e.g. [overflow_simple_add.json](https://github.com/SmartContractSecurity/SWC-registry/blob/master/test_cases/solidity/integer_overflow_and_underflow/overflow_simple_add/overflow_simple_add.json))

The combined JSON can be generated in the following way:

```bash
$ solc --pretty-json --combined-json ast,bin,bin-runtime,srcmap,srcmap-runtime overflow_simple_add.sol > overflow_simple_add.json 
```

4. The configuration file defining the types and number of weaknesses contained in the contract file (e.g. [overflow_simple_add.yaml](https://github.com/SmartContractSecurity/SWC-registry/blob/master/test_cases/solidity/integer_overflow_and_underflow/overflow_simple_add/overflow_simple_add.yaml))

Please make sure to credit other authors and mention the source if you don't write the entire contract sample yourself.

```
/*
 * @source: <link>
 * @author: <name>
 */
```

### Configuration

The configuration contains meta-information about the weaknesses contained in a particular sample. E.g.:

```
1: description: Plain and simple ADD overflow example
2: issues:
3: - id: SWC-101
4:   count: 1
5:   locations:
6:   - bytecode_offsets:
7:       '0x75ad68f906456e1cbfd6190a8f2e2dc5cb2794af4a4929448378642c992e151a': [168]
8:     line_numbers:
9:        overflow_simple_add.sol: [7]
```

- Line 1: `description` provides additional information and context for the test case.
- Line 2: A test case has zero, one or multiple `issues` that are listed in the configuration file.
- Line 3: `id` contains the SWC identifier for the particular weakness. Each weakness is described in a markdown file in the [entries](./entries) directory. 
- Line 4: `count` is the number of times that the weakness occurs in the test case.
- Line 5: `locations` has sub attributes that allow humans and tools to easier identify where issues exists in the test case. 
- Line 6-7: `bytecode_offsets` is a tuple consisting of the keccak256 hash of the runtime or creation byte code and a list of valid offsets. 
- Line 8-9: `line_numbers` is a tuple consisting of the source file and a list of valid line numbers. 




## Scope of Weaknesses 

SWCs should be concerned with weaknesses that can be identified within the code of a smart contract, typically Solidity. 
Weaknesses in 'smart contract adjacent' code should not be included. For example, the [gas siphoning attack](https://github.com/SmartContractSecurity/SWC-registry/pull/140) occurs in wallet code, and should be protected against in wallet code.

## Contact

This repository is no longer actively maintained.
