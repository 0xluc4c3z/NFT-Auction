import { expect } from "chai"

export const NFTAuctionHouseInitializeTest = (): void => {


  context(`#NFTAuctionHouse Initialize test`, async function () {

    it(`al inicializar debe ser pause: true y owner: initialize.msg.sender`, async function () {
    
      expect(await this.nftAuction.connect(this.signers.alice).paused()).to.be.eq(true);
      expect(await this.nftAuction.connect(this.signers.alice).owner()).to.be.eq(this.signers.deployer.address); 
    })
  })
}