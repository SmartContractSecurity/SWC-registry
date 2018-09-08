# Omnibus

Universal and open taxonomy for smart contract security issues, plus benchmarks for Ethereum smart contract security analysis tools. 

## Benchmark format 

The benchmarks described in this repository use a machine-readable format for test cases that smart contract security analysis tools can use to train and measure their performance. It also allows for benchmark runners to execute a collection of benchmarks across different security analysis tools and create insightful comparisons. 

Benchmarks are loosely grouped into subdirectories of within the benchmarks directory. A single benchmark consists of three files:

1. A Solidity file containing zero or more issues (e.g. `my_benchmark.sol`)
2. A JSON file generated with `solc` that contains the bytecode, AST and source code mappings (e.g. `my_benchmark.json`)
3. The configuration file describing the class and number issues contained in the sample (e.g. `my_benchmark.yaml`)

## Creating a new benchmark

Each benchmark consists of a single smart contract and must contain both the source code file and compiled version of that contract. To compile the Solidity code to the correct output format run `solc` as follows:


```bash
$ solc --pretty-json --combined-json ast,bin,bin-runtime,srcmap,srcmap-runtime my_benchmark.sol > my_benchmark.json
```

Copy the Solidity and JSON files into an existing subdirectory in `bechmarks` (or create a new subdirectory if necessary). 

### Configuration

The configuration contains meta-information about the securituy issues contained in the sample. The configuration snippet below is an example for an [Integer Overflow benchmark](./benchmarks/integer_overflow_and_underflow/overflow_simple_add.yaml). 

```
1: issues:
2: - id: "OMN-ARITH-OVERFLOW"
3:   count: 1
```

Line 1: A test case has zero, one or multiple `issues` that are listed in the configuration file.
Line 2: `id` containts the identifier (composed of class and subclass) for the particular issue. Each subclass is described in a markdown file in the `taxonomy` directory. If no appropriate identifier exists, consider adding a new class and/or subclass.
Line 3: `count` is the number of times that the issue of that class occurs in the sample.

### Taxnonomy

The Omnibus benchmark encompasses security issues as well as general informational issues related to coding best practices. Individual issues are assigned identifiers that use the following format: 

```
OMN-[CLASS]-[SUBCLASS]
```

Each identifier has a descriptive markdown file in the `taxonomy` directory. For example, the `OMN-ARITH-OVERFLOW` identifier has its meta information stored in `./taxonomy/OMN-ARITH-OVERFLOW.md` for example. 
