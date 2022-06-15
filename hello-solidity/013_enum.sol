// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract MyEnums{
    enum Status {
        None,
        Pending,
        Shipped,
        Completed,
        Rejected,
        Canceled
    }

    Status public status;

    function get() public external view returns (Status) {
        return status;
    }

    function set(Status _status) public external {
        status = _status;
    }

    function ship() public external {
        status = Status.Shipped;
    }
}