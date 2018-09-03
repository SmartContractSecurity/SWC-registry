# Omnibus

Universal benchmarks for Ethereum smart contract security analysis tools.

## Benchmark format 

The benchmarks described in this repository use a machine-readable format for test cases that smart contract security analysis tools can use to train and measure their performance. It also allows for benchmark runners to execute a collection of benchmarks across different security analysis tools and create insightful comparisons. 

There are three different components to any single benchmark: configuration, test cases and issue information.

### Configuration

The configuration encapsulates and links all necessary information to run a benchmark and measure its performance. The configuration snippet below is an example for an [Integer Overflow benchmark](./benchmarks/integer_overflow_and_underflow/). 

Line 1: defines the directory `integer_underflow_and_overflow` for all benchmark files related to the specific issue type. `overflow_add` is the filename and it represents an instance of an issue. For the below test case both the `solc` based byte code as well as the Solidity code are available. Other instances might use Vyper and `vyper` generated byte code for example. 
Line 2: `ignore` is an optional attribute and it informs tools not to use the benchmark if the value is set to true. 
Line 3: A test case can have multiple `issues` that can be defined in the configuration. 
Line 4: `address` is the byte code offset that an analysis tool should discover in the provided byte code
Line 5-7: `line_number`, `expression_start` and `expression_end` define the location of the code that is affected by the issue.

```
1: integer_underflow_and_overflow/overflow_add:
2: ignore: false 
3: issues: 
4: - address: 139
5:   line_number: 15
6:   expression_start: 9 
7:   expression_end: 27
```

Different benchmark configurations can be found in [benchconf/](./benchconf/). 

### Test case 

Any number of test cases can be added and configured within an issue type directory. A single benchmark should always have two test files: the compiled byte code and the source code. So in the case of `integer_underflow_and_overflow/overflow_add` it does have a [overflow_add.sol](./benchmarks/integer_overflow_and_underflow/overflow_add.sol) and a [overflow_add.solbin](./benchmarks/integer_overflow_and_underflow/overflow_add.solbin) file. 


### Issue information 

Each issue type also has meta information that provides relevant details. The content is formatted as markdown and placed in a `README.md` in each issue type folder. 

```
# Title 
The title describes the type of issue. 
=======
The configuration encapsulates and links all necessary information to run a benchmark and measure its performance. The configuration snippet below is an example for an [Integer Overflow benchmark](./benchmarks/integer_overflow_and_underflow/).

Line 1: defines the directory `integer_underflow_and_overflow` for all benchmark files related to the specific issue type. `overflow_add` is the filename and it represents an instance of an issue. For the below test case both the `solc` based byte code as well as the Solidity code are available. Other instances might use Vyper and `vyper` generated byte code for example.

Line 2: `has_bug` lets the report generator know if the analyzer should find one or more bugs. It can be `true` or `false`, but there is some discussion of whether the value can be [`benign`](https://github.com/EthereumAnalysisBenchmarks/ethereum-analyzer-suites-runner/wiki/Benign).

Line 3: A test case can have multiple `issues` that can be defined in the configuration, so it is in a list. An issue as information about the location, and the vulnerability.  See [Issue-Location](https://github.com/EthereumAnalysisBenchmarks/Omnibus/wiki/Issue-Location) for what a location can be and subtleties around this.

Line 4: `bytecode offset` is the byte code offset that an analysis tool should discover in the provided byte code, if the analysis tool works with byte code.

Line 5-7: `line_number`, `src` define the location of the code that is affected by the issue.

```
1: integer_underflow_and_overflow/overflow_add:
2: has_bug: false
3: issues:
4: - bytecode_offset: 139
5:   line_number: 15
6:   src: 9:18
```

### Test case

Any number of test cases can be added and configured within an issue type directory. A single benchmark should always have two test files: the compiled byte code and the source code. So in the case of `integer_underflow_and_overflow/overflow_add` it does have a [overflow_add.sol](./benchmarks/integer_overflow_and_underflow/overflow_add.sol) and a [overflow_add.solbin](./benchmarks/integer_overflow_and_underflow/overflow_add.solbin) file.


### Issue information

Each issue type also has meta information that provides relevant details. The content is formatted as markdown and placed in a `README.md` in each issue type folder.

```
# Title
The title describes the type of issue.

## Description
Describe the nature of the issue and why it can have a negative security impact on the contract system.

## Remediation
Describe whats steps can be taken to fix the issue.


## Severity
Classify the vulnerability type based CVSSv3 rating categories None, Low, Medium, High or Critical.

## References
Add one or multiple sources that give an indication that this issue is security relevant for example:

[Integer Overflow and Underflow](https://consensys.github.io/smart-contract-best-practices/known_attacks/#integer-overflow-and-underflow)

```


See the [Integer Overflow benchmark README.md](./benchmarks/integer_overflow_and_underflow/README.md)

