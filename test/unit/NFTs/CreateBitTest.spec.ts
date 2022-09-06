import { expect } from "chai"
import { ethers, network } from "hardhat";

export const CreateBitTest = (): void => {

  context(`#CreateBit`, async function () {
    it(`se crea y finaliza una subasta`, async function () {
      
      await this.nftAuction.connect(this.signers.deployer).unpause();
      expect(await this.nftAuction.paused()).to.be.eq(false);

      expect(await this.ntToken.balanceOf(this.nftAuction.address)).to.be.eq(1);

      await this.nftAuction.connect(this.signers.alice).createBid(1, { value: ethers.utils.parseEther("1") });
      await network.provider.send("evm_increaseTime", [100]);
      await this.nftAuction.connect(this.signers.deployer).settleCurrentAndCreateNewAuction();
      expect(await this.nfToken.balanceOf(this.signers.alice.address)).to.be.eq(1);

      expect(await this.nfToken.balanceOf(this.nftAuction.address)).to.be.eq(1);

      await this.nftAuction.connect(this.signers.alice).createBid(2, { value: ethers.utils.parseEther("1") });
      await network.provider.send("evm_increaseTime", [100]);
      await this.nftAuction.connect(this.signers.deployer).settleCurrentAndCreateNewAuction();
      expect(await this.nfToken.balanceOf(this.signers.alice.address)).to.be.eq(2);

      expect(await this.nfToken.balanceOf(this.nftAuction.address)).to.be.eq(1);
    })
  })
}