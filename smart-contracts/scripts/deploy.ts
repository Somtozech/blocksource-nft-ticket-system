import hre from "hardhat";

async function main() {
  const myToken = await hre.viem.deployContract("BlockSourceNft", ["BlockSourceNft", "BSF"]);

  console.log(`🚀 Deployed contract for token ${myToken} to ${myToken.address} (network: ${hre.network.name})`);

  // const hash = await myToken.write.increaseSupply([500_000n]);
  // increaseSupply sends a tx, so we need to wait for it to be mined
  // const publicClient = await hre.viem.getPublicClient();
  // await publicClient.waitForTransactionReceipt({hash});

  // const newSupply = await myToken.read.getCurrentSupply();
  // console.log(`New supply of MyToken: ${newSupply}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
