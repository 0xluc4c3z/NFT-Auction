import { waffle } from "hardhat";
import { unitFixtureType } from "../shared/fixtures";
import { Signers } from "../shared/types";
import { NFTAuctionHouseInitializeTest } from "./NFTs/NFTAuctionHouseInitializeTest.spec";
import { CreateBitTest } from "./NFTs/CreateBitTest.spec";
import { ProxyBitTest } from "./NFTs/ProxyBitTest.spec";

describe('Unit Tests', async () => {
  before(async function () {
    const wallets = waffle.provider.getWallets();

    this.signers = {} as Signers;
    this.signers.deployer = wallets[0];
    this.signers.alice = wallets[1];
    this.signers.bob = wallets[2];

    this.loadFixture = waffle.createFixtureLoader(wallets);
  });

  describe(`Nouns`, async () => {
    beforeEach(async function () {
      const { nfToken, nftAuction, nftAuctionProxyAdmin, nftAuctionProxy } = await this.loadFixture(unitFixtureType);

      this.nfToken = nfToken;
      this.nftAuction = nftAuction;
      this.nftAuctionProxyAdmin = nftAuctionProxyAdmin;
      this.nftAuctionProxy = nftAuctionProxy



      // await this.nounsAuctionHouse.connect(this.signers.deployer).initialize(
      //   this.nounsToken.address, 
      //   this.nounsToken.address,
      //   20,
      //   20,
      //   20,
      //   20,);

      await this.nfToken.connect(this.signers.deployer).setMinter(this.nftAuctionProxy.address)

      this.proxy1 = await nftAuction.attach(nftAuctionProxy.address);
    });

    //NouseAuctionHouseInitializeTest();
    //CreateBitTest();
    ProxyBitTest();
  });
});