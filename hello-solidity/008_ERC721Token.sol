// SPDX-License-Identifier: MIT

pragma  solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


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
