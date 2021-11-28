//SPDX-License-Identifier: Unlicense

// deploy on https://remix.ethereum.org/
pragma solidity 0.8.7;

contract MyContract{
    string public _slogan;
    string public _name;
    uint256 public _id;
    address public owner; // Smart Contract 独有的钱包地址类型
    uint256 _counter;

    enum Color{White, Black, GREY} // 枚举类型
    Cat[] cats; // 数组的定义方式， 还有指定长度的 uint[] memory a = new uint[](7);

    mapping(uint256 => Cat) public mcats; // hashtable 的写法

    struct Cat{
        string _name;
        Color _color;
        uint256 price;
    }

    constructor() {
        _slogan = "good good study";
        _name = "frank";
        _id = 0;
        _counter = 0;

        owner = msg.sender;  // Smart Contrat 独有的发布合约的钱包地址（所有者）
    }

    modifier onlyOwner { // modifier 定义修改器，可以在方法后面指定使用这个修改器
        require(owner == msg.sender); 
        _;
    }

    function getSlogan() public view returns (string memory) {
        return _slogan;
    }
 
    // 参数 类型
    // memory 是指值传递
    // storage 是指针传递
    function setSlogan(string memory slogan) public onlyOwner {
        _slogan = slogan;
    }

    // 添加到数组使用 push
    // 添加 struct要用 struct 自带的构造器 Cat(_name, _color, _price) 来生成一个对象
    function addCat(string memory name, Color color, uint256 price) public onlyOwner {
        cats.push(Cat(name, color, price)); 
        _counter += 1;
        mcats[_counter] = Cat(name, color, price);
    }

    function listCats() public view returns (Cat[] memory) {
        return cats;
    }

    function getCatByID(uint256 id) public view  returns (Cat memory) {
        return mcats[id];
    }
}
