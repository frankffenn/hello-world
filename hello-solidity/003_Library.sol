// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

import "./library/SafeMath.sol";

contract MyContract {
    uint256 public value;
    string public str_value;

    // 使用 SafeMath 包的方法
    function calculate(uint _value1, uint _value2) public {
        value = SafeMath.div(_value1, _value2);
    }


    // using A for B 用法: 把 A 库的所有方法都附着在 B 上，即使类型不匹配，在调用时才作检查
    using SafeMath for uint;  

    // 直接用 SafeMath 的 方法
    function calculate2(uint a, uint b) public {
        value = a.div(b);
    }

}
