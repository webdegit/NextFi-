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
    'GlobalFiUpgradeable'
  );
  const mc = await upgrades.upgradeProxy(
    '0xB4fb45FD4B9966fB4aE6a88675e3cA6475e80aC4',
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
