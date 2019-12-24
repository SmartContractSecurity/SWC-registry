pragma solidity 0.4.25;

contract exitScam{
  mapping(address => uint) balances;
  address owner;

  constructor() public{
    owner = msg.sender;
  }

  function transfer(uint amount, address to) external {
    require(balances[msg.sender] > amount);
    balances[to] += amount;
    balances[msg.sender] -= amount;
  }

  function mint(uint amount, address to) external onlyOwner{
      balances[to] += amount;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
}
