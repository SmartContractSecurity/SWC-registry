# Smart Contract Weakness Classification Registry

The SWC is a smart contract specific software weakness classification scheme for developers, tool vendors and security practitioners. The SWC does not attempt to reinvent the wheel in regards to classification of security weaknesses. From several schemes that exist in the wider security community, the Common Weakness Enumeration ([CWE](https://cwe.mitre.org)) from MITRE stands out in terms of adoption and breadth of coverage. The SWC is loosely aligned to the taxonomies and structure used in the CWE while overlaying a wide range of weakness variants that are specific to smart contracts.

The goals of this project are as follows:

- Provide a straight forward way to classify security issues in smart contract systems.
- Define a common language for describing security issues in smart contract systems' architecture, design, or code.
- Serve as a way to train and increase performance for smart contract security analysis tools.

## Taxonomy

The following taxonomies, which are used throughout the SWC, are described in further detail below:

**Variant:** A weakness that is described in a very low detail specific to a platform or technology. All variants described and referenced in the SWC are specific to smart contracts.  
**Base/Class:** A weakness that is described in a more abstract and platform or technology independent way. CWE has a wide range of base/class types that provide a meaningful hierarchal context for smart contract specific weakness variants. 
**Test Case:** Are the meat of the SWC. They are not only geared towards security analysis tool developers but are meant to provide the basis for meaningful weakness classification. 


## Create a new SWC id 

Make sure that there is no matching weakness in the registry. Create a file with a new SWC id in [taxonomy](./taxonomy). Use the the template and describe all weakness attributes. 

```
# Title 
Pick a meaningful title.

## Base/Class ID
Link a CWE base or class type to the variant. 
e.g.  [CWE-682 - Incorrect Calculation](https://cwe.mitre.org/data/definitions/682.html)

## Description 
Describe the nature and potential impact of the weakness on the contract system. 

## Remediation
Describe ways on how to fix the weakness. 

## References 
Link to external references that contain useful additional information on the issue. 

```

Weakness types and test cases can be linked in the following way. 

|  Variant | Base/Class | Test cases |   
|---|---|---|
| [EIPXXXX-100 Function Default Visibility](./taxonomy/EIPXXXX-100.md)  | [CWE710 - Improper Adherence to Coding Standards](https://cwe.mitre.org/data/definitions/710.html) | [visibility_not_set.yaml](./test_cases/default_visibility_functions/visibility_not_set.yaml) | 
| [EIPXXXX-101 Integer Overflow and Underflow](./taxonomy/EIPXXXX-101.md)  |  [CWE-682 - Incorrect Calculation](https://cwe.mitre.org/data/definitions/682.html) |  [overflow_complex_plus_bengin.yaml](./benchmarks/integer_overflow_and_underflow/overflow_complex_plus_bengin.yaml) [overflow_simple_add.yaml](./test_cases/integer_overflow_and_underflow/overflow_simple_add.yaml)  |
| [EIPXXXX-102 Outdated Compiler Version](./taxonomy/EIPXXXX-102.md)   | [CWE937 - Using Components with Known Vulnerabilities](http://cwe.mitre.org/data/definitions/937.html)  |  [version_0_4_0.yaml](./test_cases/outdated_compiler_version/version_0_4_0.yaml) |


## Create a test case  

Test cases can (and should) be as varied as possible and include simple test cases and real-world samples of vulnerable smart contracts. The test cases are grouped into subdirectories based on a single weakness variant or based on more complex real world contract systems that can contain various weakness variants. A single test case consists of three files:

1. A contract file containing zero or more weaknesses (e.g. `overflow_simple_add.sol`)
2. A JSON file generated with `solc` that contains the bytecode, AST and source code mappings (e.g. `overflow_simple_add.json`)
3. The configuration file defining the types and number of weaknesses contained in the contract file (e.g. `overflow_simple_add.yaml`)

### Sample

A test sample consists of a single smart contract and must contain both the source code file and compiled version of that contract. To compile the Solidity code to the correct output format run `solc` as follows:


```bash
$ solc --pretty-json --combined-json ast,bin,bin-runtime,srcmap,srcmap-runtime overflow_simple_add.sol > overflow_simple_add.json
```

Copy the Solidity and JSON files into an existing subdirectory in `test_cases` (or create a new subdirectory if necessary). 

Make sure the credit the author and mention the source if you don't write the contract sample yourself.

```
/*
 * @source: https://github.com/ConsenSys/smart-contract-best-practices
 * @author: Consensys Diligence
 */
```

### Configuration

The configuration contains meta-information about the weaknesses contained in a particular sample. E.g.:

```
1: issues:
2: - id: "SWC-101"
3:   count: 1
4:   location:
5:   - bytecode_offset:
6:     line_number: 7
```

- Line 1: A test case has zero, one or multiple `issues` that are listed in the configuration file.
- Line 2: `id` contains the SWC identifier for the particular weakness. Each weakness is described in a markdown file in the [taxonomy](./taxonomy) directory. 
- Line 3: `count` is the number of times that the weakness occurs in the sample.
- Line 4: `location` has sub attributes that allow humans and tools to easier identify where a weakness exists in the test case's contract. 
- Line 5: `bytecode_offset` in the byte code where the weakness is located.
- Line 6: `line_number` in the source code where the weakness is located.



## Contact

This repository is maintained by the [Mythril](https://mythril.ai) team. Ping us on the [Mythril Community Discord Server](https://discord.gg/kktn8Wt).

