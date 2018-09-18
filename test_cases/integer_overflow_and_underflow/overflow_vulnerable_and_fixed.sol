/*
 * @source: https://github.com/ConsenSys/smart-contract-best-practices
 * @author: Consensys Diligence
 */

pragma solidity 0.4.24;

contract OverflowVulnerableAndFixed {
	
	mapping (address => uint256) public balanceOf;

	// INSECURE
	function transfer1(address _to, uint256 _value) public {
	    /* Check if sender has balance */
	    require(balanceOf[msg.sender] >= _value);
	    /* Add and subtract new balances */
	    balanceOf[msg.sender] -= _value;
	    balanceOf[_to] += _value;
	}

	// SECURE
	function transfer2(address _to, uint256 _value) public {
	    /* Check if sender has balance and for overflows */
	    require(balanceOf[msg.sender] >= _value && balanceOf[_to] + _value >= balanceOf[_to]);

	    /* Add and subtract new balances */
	    balanceOf[msg.sender] -= _value;
	    balanceOf[_to] += _value;
	}
}

