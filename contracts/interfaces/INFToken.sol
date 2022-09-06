// SPDX-License-Identifier: GPL-3.0

/// @title Interface for NFToken

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface INFToken is IERC721 {
    event NounCreated(uint256 indexed tokenId);

    event NounBurned(uint256 indexed tokenId);

    event NoundersDAOUpdated(address nftsDAO);

    event MinterUpdated(address minter);

    event MinterLocked();

    event DescriptorLocked();

    function mint() external returns (uint256);

    function burn(uint256 tokenId) external;

    function setNoundersDAO(address nftsDAO) external;

    function setMinter(address minter) external;

    function lockMinter() external;

}
