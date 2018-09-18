contract SimpleEtherDrain {

  function withdrawAllAnyone() {
    msg.sender.transfer(this.balance);
  }

  function () public payable {
  }

}
