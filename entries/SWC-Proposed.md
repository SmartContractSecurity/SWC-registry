# Title
Gas Siphon Attack

## Relationships
[CWE-470: Use of Externally-Controlled Input to Select Classes or Code](https://cwe.mitre.org/data/definitions/470.html)

## Description
When an account calls an address that belongs to a contract the contract's code will execute and the caller's account will pay the gas for this computation. Programs which send transactions, such as geth, estimate the gas needed automatically and will include the gas for that arbitrary computation. Therefore if the sender of a transaction auto generates the transaction without validation they may end up paying for gas used in unintended computation. Alone this is a form of griefing, but combined with a gas token structure it allows attackers to steal gas.
The current gas fee schedule includes a refund of gas when data stored in contracts or contracts themselves are deleted from the blockchain. This incentives keeping data stored on chain to a minimum. A gas token stores random data or creates contracts and then allows them to be deleted when called. This in effect creates a token which can be redeemed for gas in periods of high prices or network congestion.
If when an victim sends a transaction which allows arbitrary computation and the attacker uses that computation to mint gas token, then the attacker has in effect stolen gas from the victim. This has the largest effect on centralized exchanges, but could affect any contract which allows arbitrary code execution.
## Remediation
Parties which will send transactions should estimate or measure the gas cost of a transaction which contains no malicious code execution then limit all transactions to that amount. For example when directly sending ether the gas should be limited to 21000.
Applications should favor pull over push payments, transfers, and calls. They should avoid allowing contract calls to external code which they don't control.

## References
* [Level K Medium Disclosure](https://medium.com/level-k/public-disclosure-malicious-gastoken-minting-236b2f8ace38)
* [Comprehensive Disclosure](https://drive.google.com/file/d/1mULop1LxHJJy_uzVBdc_xFItN9ck04Jj/view)
* [Gas Token Reference](https://gastoken.io/)
