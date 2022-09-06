import { expect } from "chai"

export const ProxyBitTest = (): void => {


  context(`#ProxyBitTest`, async function () {

    it(`crear subasta en proxy`, async function () {
      expect(await this.proxy1.connect(this.signers.alice).unpause());
      //expect(this.proxy1.paused()).to.be.eq(false);
    })
  })
}