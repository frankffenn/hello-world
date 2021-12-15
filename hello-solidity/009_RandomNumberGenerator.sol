pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

// https://medium.com/coinmonks/how-to-generate-random-numbers-on-ethereum-using-vrf-8250839dd9e2#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxODkyZWI0OWQ3ZWY5YWRmOGIyZTE0YzA1Y2EwZDAzMjcxNGEyMzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2Mzk1NTMwNjksImF1ZCI6IjIxNjI5NjAzNTgzNC1rMWs2cWUwNjBzMnRwMmEyamFtNGxqZGNtczAwc3R0Zy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMDczMTI0NTE1ODA2NTA2OTQ1MyIsImVtYWlsIjoiZnJhbmtmZmVubkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiMjE2Mjk2MDM1ODM0LWsxazZxZTA2MHMydHAyYTJqYW00bGpkY21zMDBzdHRnLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6ImZyYW5rIGZmZW5uIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdnX0N1LU5sNXBocU95cUFudVJjcGRnY3g0TWtWWERTTFkxTW55az1zOTYtYyIsImdpdmVuX25hbWUiOiJmcmFuayIsImZhbWlseV9uYW1lIjoiZmZlbm4iLCJpYXQiOjE2Mzk1NTMzNjksImV4cCI6MTYzOTU1Njk2OSwianRpIjoiMWY3YTgwZDFmYzI5ZDdlZDc5MGI1YWFiNmQ0N2UwYzg4MTlkYWVjNiJ9.SEFcnUwJGLjyQgQrSPiSHUXBqMHkSulwZnLma4L9CnPyjytFjVQ05XPTh6YchYw-ryiaupSjgx9NysvDMiRYlhNAFkX_kXvomB6tmdSKANQjWLOSzAtTJCOc1my-1MnF0krwr4tTr7hC_4elQcZuaoABSj__eKGZClafjpboU9PRnbttq_xHqUgYvfPVuUMktjivlDHSJmWe503XImw80kMUvZPsAQar3j6GTszQaERje9IZBm51c9DsqM5gisLkH0sRr_eIEGvqPgsAr32wgPFvwAqdobRdMdgQha4oWpHlKqDnwcKiTSfKj3_lIqCwzJ8rWdeGXboLKNyPZbaixw


/**
 *
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

contract RandomNumberGenerator is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 internal randomResult;

    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     * fee : 100000000000000000  
     */
    constructor(address _vrfCoordinator, address _link, bytes32 _keyHash, uint256 _fee) 
        VRFConsumerBase(_vrfCoordinator, _link) public{
        keyHash = _keyHash;
        fee = _fee;
    }
    
    /** 
     * Requests randomness 
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
    }

}
