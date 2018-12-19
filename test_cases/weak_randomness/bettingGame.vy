
@public
@payable
def __init__():
  assert msg.value > 10

@public
@payable
def diceRoll(bet: uint256):
  assert msg.value == 1
  assert bet < 8
  now: uint256
  now = convert(blockhash(block.number), uint256)
  if now % bet == 0:
    send(msg.sender, 6)
