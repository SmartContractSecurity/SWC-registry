
balances: public(map(address, uint256))
approval: public(map(address, map(address, uint256)))

@public
def transfer(to: address, amount: uint256):
  self.balances[msg.sender] = self.balances[msg.sender] - amount
  self.balances[to] = self.balances[to] + amount

@public
def transferFrom(source: address, to: address, amount: uint256):
  self.approval[source][msg.sender] = self.approval[source][msg.sender] - amount
  self.balances[source] = self.balances[source] - amount
  self.balances[to] = self.balances[to] + amount

@public
def approve(operator: address, amount: uint256):
  self.approval[msg.sender][operator] = amount
