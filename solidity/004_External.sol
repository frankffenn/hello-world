// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract MyContract {
    string public name;

    /***
    调用例子中的两个函数，我们能看到，调用setNamePublic函数（public）使用496 gas，调用setNameExternal（external）函数仅花费261 gas。这是为什么呢？
    对于public函数，每次调用时Solidity会将参数copy到内存中；而调用external函数，则可以直接读取calldata。内存分配在EVM中是非常昂贵的，而读取calldata则相对廉价很多。
    那为什么public需要做内存复制呢？那是因为public需要支持内部调用，而内部调用与外部调用的处理机制是完全不同的。内部调用是通过jump指令执行的，参数数据在内部是指向内存的。
    因此，当编译器在编译可内部调用的函数时，函数希望它的参数是载入内存的。
    而对于external，编译器是不需要允许内部调用的，因此编译器可以直接从calldata读取数据，而省略了内存复制。
    综上，作为最佳实践，如果你的函数仅仅需要外部调用，那么你应该用external，如果你的函数需要内部和外部同时调用，那么使用public。
    值得注意的是，合约内调用public，一定不要使用this.f()，因为这需要EVM执行CALL指令，这也是很昂贵的。
    */

    function setNamePublic(string memory _name) public {
        name = _name;
    }


    function setNameExternal(string memory _name) external {
        name = _name;
    }
}



