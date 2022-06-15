// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract Error {
    function testRequire(uint i) public pure {
        require(i<10, "i>=10");
    }

    function testRevert(uint i) public pure {
        if (i < 10) {
            revert("i > 10);
        }
    }

    function testAssert(uint i) public pure{
        assert(i == 2);
    }
}

contract MyError{
    error TestError(address caller uint i);

    function testError(uint i) public view {
        if (i > 10) {
            revert TestError(msg.sender, i);
        }
    }
}