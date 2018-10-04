# Smart Contract Weakness Classification Registry
[![CircleCI](https://circleci.com/gh/SmartContractSecurity/SWC-registry/tree/website.svg?style=svg)](https://circleci.com/gh/SmartContractSecurity/SWC-registry/tree/website)
[![Pages](https://img.shields.io/badge/pages-online-blue.svg)](https://smartcontractsecurity.github.io/SWC-registry/)
[![Discord](https://img.shields.io/discord/481002907366588416.svg)](https://discord.gg/qcNvR2r)
[![Waffle.io - Columns and their card count](https://badge.waffle.io/SmartContractSecurity/SWC-registry.svg?columns=all)](https://waffle.io/SmartContractSecurity/SWC-registry)

The SWC is a smart contract specific software weakness classification scheme for developers, tool vendors and security practitioners. The SWC does not attempt to reinvent the wheel in regards to classification of security weaknesses. From several schemes that exist in the wider security community, the Common Weakness Enumeration ([CWE](https://cwe.mitre.org)) from MITRE stands out in terms of adoption and breadth of coverage. The SWC is loosely aligned to the terminologies and structure used in the CWE while overlaying a wide range of weakness variants that are specific to smart contracts.

The goals of this project are as follows:

- Provide a straight forward way to classify security issues in smart contract systems.
- Define a common language for describing security issues in smart contract systems' architecture, design, or code.
- Serve as a way to train and increase performance for smart contract security analysis tools.

## Creating a new SWC entry

Make sure that there is no matching weakness in the registry. Ideally, also coordinate with the community in [#swc-registry](https://discord.gg/qcNvR2r) to prevent conflicting entries. Create a file with a new SWC ID in the [entries](./entries) directory. Use the [template](./entries/template.md) and describe all weakness attributes. 

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

```

## Creating a new Test Case  

Test cases can (and should) be as varied as possible and include both simple test cases and real-world samples of vulnerable smart contracts. The test cases are grouped into subdirectories based on a single weakness variant or based on more complex real world contract systems that can contain various weakness variants. A single test case consists of three files:

1. A contract file containing zero or more weaknesses (e.g. [overflow_simple_add.sol](https://github.com/SmartContractSecurity/SWC-registry/blob/master/test_cases/integer_overflow_and_underflow/overflow_simple_add.sol)
2. A JSON file generated with `solc` that contains the byte code, AST and source code mappings (e.g. [overflow_simple_add.json](https://github.com/SmartContractSecurity/SWC-registry/blob/master/test_cases/integer_overflow_and_underflow/overflow_simple_add.json))
3. The configuration file defining the types and number of weaknesses contained in the contract file (e.g. [overflow_simple_add.yaml](https://github.com/SmartContractSecurity/SWC-registry/blob/master/test_cases/integer_overflow_and_underflow/overflow_simple_add.yaml))

### Sample

A test sample consists of a single smart contract and must contain both the source code file and compiled version of that contract. To compile the Solidity code to the correct output format run `solc` as follows:


```bash
$ solc --pretty-json --combined-json ast,bin,bin-runtime,srcmap,srcmap-runtime overflow_simple_add.sol > overflow_simple_add.json
```

Copy the Solidity and JSON files into an existing subdirectory in `test_cases` (or create a new subdirectory if necessary). 

Make sure the credit the author and mention the source if you don't write the contract sample yourself.

```
/*
 * @source: <link>
 * @author: <name>
 */
```

### Configuration

The configuration contains meta-information about the weaknesses contained in a particular sample. E.g.:

```
1: description: "Test a simple integer overflow"
2: issues:
3: - id: "SWC-101"
4:   count: 1
5:   locations:
6:   - bytecode_offsets: [101]
7:     line_numbers: [7]
```

- Line 1: `description` provides additional information and context for the test case
- Line 2: A test case has zero, one or multiple `issues` that are listed in the configuration file.
- Line 3: `id` contains the SWC identifier for the particular weakness. Each weakness is described in a markdown file in the [entries](./entries) directory. 
- Line 4: `count` is the number of times that the weakness occurs in the sample.
- Line 5: `locations` has sub attributes that allow humans and tools to easier identify where a weakness exists in the test case's contract. 
- Line 6: `bytecode_offsets` is a list of valid byte code offsets that can be reported to identify a weakness.  
- Line 7: `line_numbers` is a list of valid line numbers that can be reported to identify a weakness.

## Contributing

Before you create a PR for the first time make sure you have read:

- the sections [Create a new SWC entry](#create-a-new-swc-entry) and [Create a test case](#create-a-test-case).
- read several existing SWC definitions and their test cases. 

From time to time there will be challenges on [Gitcoin](https://gitcoin.co). Follow the below link to check what challenges are currently open.  

<a href="https://gitcoin.co/explorer?q=SWC">
    <img src="https://gitcoin.co/funding/embed?repo=https://github.com/SmartContractSecurity/SWC-registry/&max_age=60&badge=1">
</a>

## Contact

This repository is maintained by the [Mythril](https://mythril.ai) team. Join the #swc-registry channel on the [Mythril Community Discord Server](https://discord.gg/qcNvR2r) for discussions.
