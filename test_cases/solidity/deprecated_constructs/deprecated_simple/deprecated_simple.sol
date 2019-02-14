

contract DeprecatedSimple {
	
	function useDeprecated() public constant {

		// Do everything that's deprecated, then commit suicide.

		bytes32 blockhash = block.blockhash(0);
		bytes32 hashofhash = sha3(blockhash);

		uint gas = msg.gas;

		if (gas == 0) {
			throw;
		}

		address(this).callcode();

		suicide(address(0));
	}

	function () public {}

}
