import { Fixture } from "ethereum-waffle";
import { Wallet } from "@ethersproject/wallet";
import { NFTAuction } from "../../typechain-types";
import { NFToken } from "../../typechain-types";

declare module "mocha" {
  export interface Context {
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
    //mocks: Mocks;
    nftAuction: NFTAuction;
    nfToken: NFToken;
  }
}

export interface Signers {
  deployer: Wallet;
  alice: Wallet;
  bob: Wallet;
}

// export interface Mocks {
//   mockUsdc: MockContract;
// }