# Omnibus

Universal and open taxonomy for smart contract security issues, plus benchmarks for Ethereum smart contract security analysis tools. 

## Benchmark format 

The benchmarks described in this repository use a machine-readable format for test cases that smart contract security analysis tools can use to train and measure their performance. It also allows for benchmark runners to execute a collection of benchmarks across different security analysis tools and create insightful comparisons. 

There are three different components to any single benchmark: configuration, test cases and issue information.

### Configuration

The configuration encapsulates and links all necessary information to run a benchmark and measure its performance. The configuration snippet below is an example for an [Integer Overflow benchmark](./benchmarks/integer_overflow_and_underflow/overflow_simple_add.yaml). 

```
1: issues:
2: - type: "OMN-ARITH-OVERFLOW"
3:   bytecode_offset: 139
4:   src_location: 8
```

Line 1: A test case has zero, one or multiple `issues` that can be defined in the configuration. 
Line 2: `type` relates to the issue class. Each issue class is defined by a taxonomy and it is stored in `./taxonomy/`
Line 3: `address` is the byte code offset that an analysis tool should discover in the provided byte code
Line 4: `src_location` refers to the line of code that issue was found. 
 

### Adding a benchmark

Any number of test cases can be added and configured within an issue category directory. A single benchmark must have three files:

1. A Solidity file containing zero or more issues (e.g. `my_benchmark.sol`)
2. A JSON file generated with `solc` that contains the bytecode, AST and source code mappings (e.g. `my_benchmark.json`)
3. The configuration file describing the issues expected to be detected in the sample (e.g. `my_benchmark.yaml`)

```bash
$ solc --pretty-json --combined-json ast,bin,bin-runtime,srcmap,srcmap-runtime my_benchmark.sol > my_benchmark.json
```

### Issue information 

Each issue class has a unique taxonomy and meta information that provides relevant details. The content is formatted as markdown and placed in a `<Taxonomy>.md`. So issue class `OMN-ARITH-OVERFLOW` has its meta infromation stored in `./taxonomy/OMN-ARITH-OVERFLOW.md` for example. 
