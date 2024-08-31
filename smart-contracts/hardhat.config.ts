import {sepolia} from "wagmi/chains";
import type {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "localhost",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/3NTQFN25mVXJ3g_A8LmKI7T4VFfQ7etg",
      accounts: ["c1dc3f034eb26d2d0c0b221f7b3c58533fbc4034a8c706cca08d22391a68cd10"],
    },
  },
};

export default config;
