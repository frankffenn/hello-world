// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.7;

contract JSToken{
    string public name;
    address public _sender;

    mapping(address => uint) public balances;

    // 这里的地址不能使用 msg.sender, msg.sender 是合约的地址
    // 必须是要用 tx.origin 那就是调用合约方法的钱包地址
    function mint() public {
        _sender = msg.sender;
        balances[tx.origin] += 1; 
    }
}

contract Transfer {
    mapping(address => uint256) public balances;
    address payable wallet;
    address public token;

    constructor(address payable _wallet, address _token) {
        wallet = _wallet;
        token = _token;
    }

    // event 可以定义一个事件， 使用 emit 关键字来触发事件
    // 使用事件之后会产生一个 callback，可以在前端监听事件的处理结果
    // indexed 关键字为事件添加索引，添加索引后允许通过这个参数来查找日志，在前端调用的时过滤使用，否则 filter 会报错
    event Purches(
        address indexed _buyer, 
        uint256 _amount
    );

    // 匿名事件只需在事件后面添加 anonymous 修饰词
    //event anonymousPurches(address indexed _buyer, uint256 _amount) anonymous; 

    // payable 修饰符表示在调用方法时可以附加发送一些 ETH
    // 否则调用时不能添加 value, 并且方法内不能使用 msg.value
    function buyToken() public payable {
        balances[msg.sender] += msg.value;
    }

    function buyTokenWithoutPayable() public {
        balances[msg.sender] += 1;
    }

    // address 的 transfer 方法是转账到钱包账户
    function buyTokenWithTransfer() public payable {
        wallet.transfer(msg.value);
    }

    // 调用 JSToken 合约的方法
    function buyTokenWithContract() public {
        JSToken(address(token)).mint();
    }
}
