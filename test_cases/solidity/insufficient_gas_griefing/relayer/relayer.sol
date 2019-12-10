/*
 * @source: https://consensys.github.io/smart-contract-best-practices/known_attacks/#insufficient-gas-griefing
 * @author: ConsenSys Diligence
 * Modified by Kaden Zipfel
 */

pragma solidity ^0.4.21;

contract Relayer {
    mapping (bytes => bool) executed;

    function relay(bytes _data) public {
        // replay protection; do not call the same transaction twice
        require(executed[_data] == false);
        executed[_data] = true;

        address executor = new Executor();
        executor.call(bytes4(keccak256("execute(bytes)")), _data);
    }
}

// Contract called by Relayer
contract Executor {
    function execute(bytes _data) public {
        // Execute contract code
    }
}