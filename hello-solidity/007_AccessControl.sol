// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20, AccessControl {
    // Create a new role indentifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    constructor(address _minter, address _burner) ERC20("My token", "MTK"){
        _setupRole(MINTER_ROLE, _minter);
        _setupRole(BURNER_ROLE, _burner);
    }

    /**
    可以直接把合约部者设置为默认管理员权限，这个角色就可以
    constructor() ERC20("MyToken", "MTK") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    */

    // 定义两种角色，并且给这两个角色附加权限
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyRole(BURNER_ROLE) {
        _burn(from, amount);
    }
}


// 动态附加和撤销权限
contract MyToken2 is ERC20, AccessControl {
    // Create a new role indentifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    constructor() ERC20("MyToken", "MTK") {
        // 可以直接把合约部者设置为默认管理员权限
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // 虽然没有和上面一样对用户进行赋权， 但管理员可以自己创建 _mint 和 _burn 权限， 之后撤销
    // 另外管理员有 
    // grantRole(bytes32 role, address account) 给用户授权
    // revokeRole(bytes32 role, address account) 撤销用户权限
    // renounceRole(bytes32 role, address account) 放弃权限
    // getRoleAdmin(bytes32 role) 查看管理这个角色的管理员角色
    // hasRole(bytes32 role, address account) 查看用户是否被授予权限
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyRole(BURNER_ROLE) {
        _burn(from, amount);
    }
}
