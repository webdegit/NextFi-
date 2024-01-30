const { ethers, upgrades } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  const gas = await ethers.provider.getGasPrice();

  console.log('Gas price is ', gas);

  console.log('Deploying contracts with the account:', deployer.address);
  const balance = await deployer.getBalance();
  const formatedBalance = ethers.utils.formatEther(balance);

  console.log('Account balance:', formatedBalance.toString(), 'ETH');

  const ContractFactory = await ethers.getContractFactory(
    'StakingUpgradeable'
  );
  const mc = await upgrades.upgradeProxy(
    '0xf08015a2b0B5eA256f91a08a9031263Ef676C3Aa',
    ContractFactory,
    { gasPrice: gas }
  );

  await mc.deployed();
  console.log('Contract Upgraded:', mc.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
