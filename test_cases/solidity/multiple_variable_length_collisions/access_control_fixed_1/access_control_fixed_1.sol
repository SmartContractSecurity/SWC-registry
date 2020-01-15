/*
 * @author: Steve Marx
 * Modified by Kaden Zipfel
 */

pragma solidity ^0.5.0;

import "./ECDSA.sol";

contract AccessControl {
    using ECDSA for bytes32;
    mapping(address => bool) isAdmin;
    mapping(address => bool) isRegularUser;
    // Add a single user, either an admin or regular user.
    function addUser(
        address user,
        bool admin,
        bytes calldata signature
    )
        external
    {
        if (!isAdmin[msg.sender]) {
            // Allow calls to be relayed with an admin's signature.
            bytes32 hash = keccak256(abi.encodePacked(user));
            address signer = hash.toEthSignedMessageHash().recover(signature);
            require(isAdmin[signer], "Only admins can add users.");
        }
        if (admin) {
            isAdmin[user] = true;
        } else {
            isRegularUser[user] = true;
        }
    }
}