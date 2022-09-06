import { Fixture } from "ethereum-waffle";
import { ContractFactory, Wallet } from "ethers";
import { ethers } from "hardhat";
import { NFTAuction } from "../../typechain-types";
import { NFToken } from "../../typechain-types";
import { NFTAuctionProxy } from "../../typechain-types";
import { NFTAuctionProxyAdmin } from "../../typechain-types";

type UnitFixtureType = {
  nftAuction: NFTAuction;
  nfToken: NFToken;
  nftAuctionProxyAdmin: NFTAuctionProxyAdmin;
  nftAuctionProxy: NFTAuctionProxy;
};

export const unitFixtureType: Fixture<UnitFixtureType> = async (
  signers: Wallet[]
) => {
  const deployer: Wallet = signers[0];

  const nfTokenFactory: ContractFactory = await ethers.getContractFactory(
    'NFToken'
  );

  const nftAuctionFactory: ContractFactory = await ethers.getContractFactory(
    'NFTAuction'
  );

  const nftAuctionProxyAdminFactory: ContractFactory = await ethers.getContractFactory(
    'NFTAuctionProxyAdmin'
  )

  const nftAuctionProxyFactory: ContractFactory = await ethers.getContractFactory(
    'NFTAuctionProxy'
  )

  const nfToken: NFToken = (await nfTokenFactory
    .connect(deployer)
    .deploy(deployer.address, deployer.address)) as NFToken;

  const nftAuction: NFTAuction = (await nftAuctionFactory
    .connect(deployer)
    .deploy()) as NFTAuction;

  const nftAuctionProxyAdmin: NFTAuctionProxyAdmin = (await nftAuctionProxyAdminFactory
    .connect(deployer)
    .deploy()) as NFTAuctionProxyAdmin;

  await nfToken.deployed();
  await nftAuction.deployed();
  await nftAuctionProxyAdmin.deployed();

  const abi = new ethers.utils.AbiCoder();
  const data = abi.encode(["initialize(INFToken,address,uint256,uint256,uint8,uint256)"],[nfToken,nfToken.address,20,20,20,20]);

  const methodId = ethers.utils.keccak256("initialize(INFToken,address,uint256,uint256,uint8,uint256)").substring(0, 10);
  //const stringArgument = ethers.utils.pad



  const nftAuctionProxy: NFTAuctionProxy = (await nftAuctionProxyFactory
    .connect(deployer)
    .deploy(nftAuction.address, nftAuctionProxyAdmin.address, data)) as NFTAuctionProxy;

  await nftAuctionProxy.deployed();

  return { nfToken, nftAuction, nftAuctionProxyAdmin, nftAuctionProxy };
}