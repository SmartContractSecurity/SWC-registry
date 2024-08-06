# Please note, this content is no longer actively maintained.

The content of the SWC registry has not been thoroughly updated since 2020. It is known to be incomplete and may contain errors as well as crucial omissions.

For currently maintained guidance on known Smart Contract vulnerabilities written primarily as guidance for security reviewers, please see the
[EEA EthTrust Security Levels specification](https://entethalliance.org/specs/ethtrust-sl). As well as the latest release version, an
[Editor's draft](https://entethalliance.github.io/eta-registry/security-levels-spec.html) is available,
that represents the latest work of the group developing the specification.

General guidance for developers on what to consider to ensure security, that is currently maintained, is also available through the
[Smart Contract Security Verification Standard (SCSVS)](https://github.com/ComposableSecurity/SCSVS).

# Title

Reentrancy

## Relationships

[CWE-841: Improper Enforcement of Behavioral Workflow](https://cwe.mitre.org/data/definitions/841.html)

## Description

One of the major dangers of calling external contracts is that they can take over the control flow. In the reentrancy attack (a.k.a. recursive call attack), a malicious contract calls back into the calling contract before the first invocation of the function is finished. This may cause the different invocations of the function to interact in undesirable ways.

## Remediation

The best practices to avoid Reentrancy weaknesses are:

- Make sure all internal state changes are performed before the call is executed. This is known as the [Checks-Effects-Interactions pattern](https://solidity.readthedocs.io/en/latest/security-considerations.html#use-the-checks-effects-interactions-pattern)
- Use a reentrancy lock (ie.  [OpenZeppelin's ReentrancyGuard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol)).

## References

- [Ethereum Smart Contract Best Practices - Reentrancy](https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/)

## Samples

### modifier_reentrancy.sol

```solidity
pragma solidity ^0.5.0;

contract ModifierEntrancy {

  mapping (address => uint) public tokenBalance;
  string constant name = "Nu Token";
  Bank bank;

  constructor() public{
      bank = new Bank();
  }

  //If a contract has a zero balance and supports the token give them some token
  function airDrop() hasNoBalance supportsToken  public{
    tokenBalance[msg.sender] += 20;
  }

  //Checks that the contract responds the way we want
  modifier supportsToken() {
    require(keccak256(abi.encodePacked("Nu Token")) == bank.supportsToken());
    _;
  }

  //Checks that the caller has a zero balance
  modifier hasNoBalance {
      require(tokenBalance[msg.sender] == 0);
      _;
  }
}

contract Bank{

    function supportsToken() external returns(bytes32) {
        return keccak256(abi.encodePacked("Nu Token"));
    }

}

```

### modifier_reentrancy_fixed.sol

```solidity
pragma solidity ^0.5.0;

contract ModifierEntrancy {
  mapping (address => uint) public tokenBalance;
  string constant name = "Nu Token";
  Bank bank;
  constructor() public{
      bank = new Bank();
  }

  //If a contract has a zero balance and supports the token give them some token
  function airDrop() supportsToken hasNoBalance  public{ // In the fixed version supportsToken comes before hasNoBalance
    tokenBalance[msg.sender] += 20;
  }

  //Checks that the contract responds the way we want
  modifier supportsToken() {
    require(keccak256(abi.encodePacked("Nu Token")) == bank.supportsToken());
    _;
  }
  //Checks that the caller has a zero balance
  modifier hasNoBalance {
      require(tokenBalance[msg.sender] == 0);
      _;
  }
}

contract Bank{

    function supportsToken() external returns(bytes32){
        return(keccak256(abi.encodePacked("Nu Token")));
    }
}

```

### simple_dao.sol

```solidity
/*
 * @source: http://blockchain.unica.it/projects/ethereum-survey/attacks.html#simpledao
 * @author: Atzei N., Bartoletti M., Cimoli T
 * Modified by Josselin Feist
 */
pragma solidity 0.4.24;

contract SimpleDAO {
  mapping (address => uint) public credit;

  function donate(address to) payable public{
    credit[to] += msg.value;
  }

  function withdraw(uint amount) public{
    if (credit[msg.sender]>= amount) {
      require(msg.sender.call.value(amount)());
      credit[msg.sender]-=amount;
    }
  }  

  function queryCredit(address to) view public returns(uint){
    return credit[to];
  }
}

```

### simple_dao_fixed.sol

```solidity
/*
 * @source: http://blockchain.unica.it/projects/ethereum-survey/attacks.html#simpledao
 * @author: Atzei N., Bartoletti M., Cimoli T
 * Modified by Bernhard Mueller, Josselin Feist
 */
pragma solidity 0.4.24;

contract SimpleDAO {
  mapping (address => uint) public credit;

  function donate(address to) payable public{
    credit[to] += msg.value;
  }

  function withdraw(uint amount) public {
    if (credit[msg.sender]>= amount) {
      credit[msg.sender]-=amount;
      require(msg.sender.call.value(amount)());
    }
  }  

  function queryCredit(address to) view public returns (uint){
    return credit[to];
  }
}

```
