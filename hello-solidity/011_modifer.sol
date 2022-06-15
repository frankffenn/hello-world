// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract MyToken{
    uint32 public total;
    address public admin;

    modifier isAdmin() {
        require(msg.sender == admin, "sender no permission");
        _;
    }

    function addSupply(uint32 amount) external isAdmin {
        total += amount;
    }
}  