
balances: public(map(address, int128))
airDrop: public(map(address, bool))

@public
@payable
def __init__():
  assert msg.value > 0

@public
def register(funder: address):
  assert not self.airDrop[funder]
  data: bytes[32]
  data = raw_call(funder, '0x', outsize = 32, gas = 80000, value = 0)
  zero: bytes[32]
  assert not data == zero
  self.balances[funder] = self.balances[funder] + 10
