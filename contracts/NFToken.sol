// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./interfaces/INFToken.sol";

contract NFToken is INFToken, ERC721, Ownable {

    //bytes data = abi.encodeWithSignature("initialize(INounsToken address)");

    // The nounders DAO address (creators org)
    address public nftsDAO;

    // An address who has permissions to mint Nouns
    address public minter;

    // Whether the minter can be updated
    bool public isMinterLocked;

    // The internal noun ID tracker
    uint256 private _currentNftId;

    // IPFS content hash of contract-level metadata
    string private _contractURIHash = '';

    /**
     * @notice Require that the minter has not been locked.
     */
    modifier whenMinterNotLocked() {
        require(!isMinterLocked, 'Minter is locked');
        _;
    }

    /**
     * @notice Require that the sender is the nounders DAO.
     */
    modifier onlyNftsDAO() {
        require(msg.sender == nftsDAO, 'Sender is not the nounders DAO');
        _;
    }

    /**
     * @notice Require that the sender is the minter.
     */
    modifier onlyMinter() {
        require(msg.sender == minter, 'Sender is not the minter');
        _;
    }

    constructor(
        address _nftsDAO,
        address _minter
    ) ERC721('Nfts', 'NFTs') {
        nftsDAO = _nftsDAO;
        minter = _minter;
    }

    /**
     * @notice The IPFS URI of contract-level metadata.
     */
    function contractURI() public view returns (string memory) {
        return string(abi.encodePacked('ipfs://', _contractURIHash));
    }

    /**
     * @notice Set the _contractURIHash.
     * @dev Only callable by the owner.
     */
    function setContractURIHash(string memory newContractURIHash) external onlyOwner {
        _contractURIHash = newContractURIHash;
    }

    /**
     * @notice Mint a Noun to the minter, along with a possible nounders reward
     * Noun. Nounders reward Nouns are minted every 10 Nouns, starting at 0,
     * until 183 nounder Nouns have been minted (5 years w/ 24 hour auctions).
     * @dev Call _mintTo with the to address(es).
     */
    function mint() public override onlyMinter returns (uint256) {
        _currentNftId = _currentNftId + 1;
        _mint(minter, _currentNftId);
        return _currentNftId;
    }

    /**
     * @notice Burn a noun.
     */
    function burn(uint256 nftId) public override onlyMinter {
        _burn(nftId);
        emit NounBurned(nftId);
    }

    /**
     * @notice Set the nounders DAO.
     * @dev Only callable by the nounders DAO when not locked.
     */
    function setNoundersDAO(address _nftsDAO) external override onlyNftsDAO {
        nftsDAO = _nftsDAO;

        emit NoundersDAOUpdated(_nftsDAO);
    }

    /**
     * @notice Set the token minter.
     * @dev Only callable by the owner when not locked.
     */
    function setMinter(address _minter) external override onlyOwner whenMinterNotLocked {
        minter = _minter;

        emit MinterUpdated(_minter);
    }

    function seeMinter() external view returns(address){
        return minter;
    }

    /**
     * @notice Lock the minter.
     * @dev This cannot be reversed and is only callable by the owner when not locked.
     */
    function lockMinter() external override onlyOwner whenMinterNotLocked {
        isMinterLocked = true;

        emit MinterLocked();
    }  
}   