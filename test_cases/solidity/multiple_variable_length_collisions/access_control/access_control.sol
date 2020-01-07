/*
 * @author: Steve Marx
 */

pragma solidity ^0.5.0;

import "./ECDSA.sol";

contract AccessControl {
    using ECDSA for bytes32;
    mapping(address => bool) isAdmin;
    mapping(address => bool) isRegularUser;
    // Add admins and regular users.
    function addUsers(
        address[] calldata admins,
        address[] calldata regularUsers,
        bytes calldata signature
    )
        external
    {
        if (!isAdmin[msg.sender]) {
            // Allow calls to be relayed with an admin's signature.
            bytes32 hash = keccak256(abi.encodePacked(admins, regularUsers));
            address signer = hash.toEthSignedMessageHash().recover(signature);
            require(isAdmin[signer], "Only admins can add users.");
        }
        for (uint256 i = 0; i < admins.length; i++) {
            isAdmin[admins[i]] = true;
        }
        for (uint256 i = 0; i < regularUsers.length; i++) {
            isRegularUser[regularUsers[i]] = true;
        }
    }
}