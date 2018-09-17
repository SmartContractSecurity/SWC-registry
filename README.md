# Smart Contract Vulnerability Classification Registry

The SCVCR is an open vulnerability classification registry for Ethereum smart contract developers, tool vendors and security practitioners. The SCVCR does not attempt to reinvent the wheel in regards to vulnerability classification. From several schemes that exist in the wider security community, the Common Weakness Enumeration ([CWE](https://cwe.mitre.org)) from MITRE stands out in terms of adoption and breadth of coverage. The SCVCR is loosely aligned to the taxonomies and structure used in the CWE while overlaying a wide range of vulnerability variants that are specific to smart contracts.

The goals of this project are as follows:

- Provide a straight forward way to classify security issues in smart contract systems.
- Define a common language for describing security issues in smart contract systems' architecture, design, or code.
- Serve as a way to train and increase performance for smart contract security analysis tools.

## Taxonomy

The following taxonomies, which are used throughout the SCVCR, are described in further detail below:

**Variant:** A vulnerability that is described in a very low detail specific to a platform or technology. All variants described and referenced in the SCVCR are specific to smart contracts.  
**Base/Class:** A vulnerability that is described in a more abstract and platform or technology independent way. CWE has a wide range of base/class types that provide a meaningful hierarchal context for smart contract specific vulnerability variants. 
**Test Case:** Are the meat of the SCVCR. They are not only geared towards security analysis tool developers but are meant to provide the basis for meaningful vulnerability classification. 


## Test cases

Test cases can (and should) be as varied as possible and include simple test cases and real-world samples of vulnerable smart contracts. The test cases are grouped into subdirectories based on a single vulnerability variant or based on more complex real world contract systems that contains different vulnerability variants. A single test case consists of three files:

1. A contract file containing zero or more vulnerabilities (e.g. `overflow_simple_add.sol`)
2. A JSON file generated with `solc` that contains the bytecode, AST and source code mappings (e.g. `overflow_simple_add.json`)
3. The configuration file defining the types and number of vulnerabilities contained in the contract file (e.g. `overflow_simple_add.yaml`)


## Classification  

The table below is a sample on how the classification and mapping of test cases will work. This will be auto generated from the taxonomy mark down files and the test cases. 

|  Variant | Base/Class | Test cases |   
|---|---|---|
| [EIPXXXX-100 Function Default Visibility](./taxonomy/EIPXXXX-100.md)  | [CWE710 - Improper Adherence to Coding Standards](https://cwe.mitre.org/data/definitions/710.html) | [visibility_not_set.yaml](./benchmarks/default_visibility_functions/visibility_not_set.yaml) | 
| [EIPXXXX-101 Integer Overflow and Underflow](./taxonomy/EIPXXXX-101.md)  |  [CWE-682 - Incorrect Calculation](https://cwe.mitre.org/data/definitions/682.html) |  [overflow_complex_plus_bengin.yaml](./benchmarks/default_visibility_functions/visibility_not_set.yaml) [visibility_not_set.yaml](./benchmarks/default_visibility_functions/visibility_not_set.yaml)  |
| [EIPXXXX-102 Outdated Compiler Version](./taxonomy/EIPXXXX-102.md)   | [CWE937 - Using Components with Known Vulnerabilities](http://cwe.mitre.org/data/definitions/937.html)  |   |
| [EIPXXXX-103 Floating Pragma](./taxonomy/EIPXXXX-103.md)   |  [CWE664 - Improper Control of a Resource Through its Lifetime](https://cwe.mitre.org/data/definitions/664.html) |   | 

## Creating a new test case

A test case consists of a single smart contract and must contain both the source code file and compiled version of that contract. To compile the Solidity code to the correct output format run `solc` as follows:


```bash
$ solc --pretty-json --combined-json ast,bin,bin-runtime,srcmap,srcmap-runtime overflow_simple_add.sol > overflow_simple_add.json
```

Copy the Solidity and JSON files into an existing subdirectory in `bechmarks` (or create a new subdirectory if necessary). 

### Configuration

The configuration contains meta-information about the security issues contained in a particular sample. E.g.:

```
1: issues:
2: - id: "OMN-ARITH-OVERFLOW"
3:   count: 1
4:   location:
5:   - bytecode_offset:
6:     line_number: 7
```

- Line 1: A test case has zero, one or multiple `issues` that are listed in the configuration file.
- Line 2: `id` contains the identifier (composed of class and subclass) for the particular issue. Each subclass is described in a markdown file in the [taxonomy](./taxonomy) directory. If no appropriate identifier exists, consider adding a new class and/or subclass.
- Line 3: `count` is the number of times that the issue of that class occurs in the sample.
- Line 4:
- Line 5:
- Line 6:

## Contact

This repository is maintained by the [Mythril](https://mythril.ai) team. Ping us on the [Mythril Community Discord Server](https://discord.gg/kktn8Wt).

