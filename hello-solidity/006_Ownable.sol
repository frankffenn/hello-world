// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

// Ownable 接口
// 可以继承 Ownable 的方法和参数
// owner 合约所有者地址
// transferOwner 转让所有权
// renounceOwner 放弃所有权
// onlyOwner 修饰符
contract MyContract is Ownable {
    mapping(address => uint256) balances;

    function getBalance() public view returns (uint256){
        return balances[msg.sender];
    }

    function addFunds(address _address) public onlyOwner {
        balances[_address] += 1000;
    }
}
