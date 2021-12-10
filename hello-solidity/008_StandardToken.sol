// SPDX-License-Identifier: MIT

pragma  solidity 0.8.7;


import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


// 通用协议:
// ERC20：最广泛的可替代资产代币标准，尽管由于其简单性而有所限制。 
// ERC721：不可替代代币的实际解决方案，通常用于收藏品和游戏。 
// ERC777：更丰富的可替代代币标准，支持新用例并建立在过去的学习基础上。向后兼容 ERC20。 
// ERC1155：多代币的新标准，允许单个合约代表多个可替代和不可替代的代币，以及批量操作以提高 gas 效率。


//  ERC20 token 的名称和符号，总量，默认 decimals 是18
contract AssToken is ERC20, AccessControl {
    // 为铸币者角色创建一个新的角色标识符
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(uint256 totalSupply) ERC20("Ass Token", "ASS") {
        // 在部署合约的时把部署的钱包地址设置为 MINTER
        _setupRole(MINTER_ROLE, msg.sender);
        _mint(msg.sender, totalSupply);
    }

    // 如果想增发，可以继续实现 _mint 
    function mint(uint256 amount) public {
         require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _mint(msg.sender, amount);
    }
}


// ERC721 协议有以下方法
// Approved(address to, uint245 tokenId) 授权这个 tokenId 的币给这个 address, 允许其进行转账
// setApprovealForAll(address operator, bool approved) 所有的币都授权给这个 operator 地址，允许其进行转账
// transferFrom(address from, address to, uint256 tokenId) 当自己已经被授权这个 tokenId 之后，可以从 from 钱包转到 to 钱包里
contract  GameItem is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private  _tokenIds;

    constructor () ERC721("Game Item", "ITM") {}

    function awardItem(address player, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }   
}
