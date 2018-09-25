pragma solidity ^0.4.19;

contract OutOfBoundsException {

	uint256[] public array;

	function getArrayElement(uint256 idx) returns (uint256) {
		return array[idx];
	}

}
