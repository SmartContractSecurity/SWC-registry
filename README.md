# Standard Taxonomy of Security Issues in Ethereum Smart Contracts (EIP 31337)

An universal and open taxonomy for smart contract security issues. Also includes micro-samples and vulnerable real-world smart contracts that showcase different variants of each issue.

## Taxonomy

The taxonomy encompasses security vulnerabilities as well as violations of secure coding best practices. Individual issues are assigned identifiers that use the following format: 

```
OMN-[CLASS]-[SUBCLASS]
```

Each identifier has a descriptive markdown file in the `taxonomy` directory. For example, the `OMN-ARITH-OVERFLOW` identifier has its meta information stored in [OMN-ARITH-OVERFLOW.md](./taxonomy/OMN-ARITH-OVERFLOW.md).

## Samples

For each subclass we include machine-readable test cases that show various exploitable and non-exploitable variants of the issue in question. These samples are useful for creating insightful comparisons between different types of analysis and optimizing the coverage achieved by combining different tools.

Test cases can (and should) be as varied as possible and include both micro-benchmarks and real-world samples of vulnerable smart contracts.

The test cases are loosely grouped into subdirectories of within the benchmarks directory. A single benchmark consists of three files:

1. A Solidity file containing zero or more issues (e.g. `my_benchmark.sol`)
2. A JSON file generated with `solc` that contains the bytecode, AST and source code mappings (e.g. `my_benchmark.json`)
3. The configuration file describing the class and number issues contained in the sample (e.g. `my_benchmark.yaml`)

## Creating a new test case

A test case consists of a single smart contract and must contain both the source code file and compiled version of that contract. To compile the Solidity code to the correct output format run `solc` as follows:


```bash
$ solc --pretty-json --combined-json ast,bin,bin-runtime,srcmap,srcmap-runtime my_benchmark.sol > my_benchmark.json
```

Copy the Solidity and JSON files into an existing subdirectory in `bechmarks` (or create a new subdirectory if necessary). 

### Configuration

The configuration contains meta-information about the security issues contained in a particular sample. E.g.:

```
1: issues:
2: - id: "OMN-ARITH-OVERFLOW"
3:   count: 1
```

- Line 1: A test case has zero, one or multiple `issues` that are listed in the configuration file.
- Line 2: `id` containts the identifier (composed of class and subclass) for the particular issue. Each subclass is described in a markdown file in the [taxonomy](./taxonomy) directory. If no appropriate identifier exists, consider adding a new class and/or subclass.
- Line 3: `count` is the number of times that the issue of that class occurs in the sample.

## Contact

This repository is maintained by the [Mythril](https://mythril.ai) team. Ping us on the [Mythril Community Discord Server](https://discord.gg/kktn8Wt).

