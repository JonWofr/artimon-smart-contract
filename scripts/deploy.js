const hre = require('hardhat');

const main = async () => {
  const Artimon = await hre.ethers.getContractFactory('Artimon');
  const artimon = await Artimon.deploy();

  await artimon.deployed();
  console.log(`Artimon deployed to: ${artimon.address}`);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
