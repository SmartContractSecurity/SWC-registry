/*
 * @source: http://blockchain.unica.it/projects/ethereum-survey/attacks.html#simpledao
 * @author: Atzei N., Bartoletti M., Cimoli T
 * Modified by Bernhard Mueller
 */

contract SimpleDAO {
  mapping (address => uint) public credit;
    
  function donate(address to) {
    credit[to] += msg.value;
  }
    
  function withdraw(uint amount) {
    if (credit[msg.sender]>= amount) {
      credit[msg.sender]-=amount;
      msg.sender.call.value(amount)();
    }
  }  

  function queryCredit(address to) returns (uint){
    return credit[to];
  }
}
