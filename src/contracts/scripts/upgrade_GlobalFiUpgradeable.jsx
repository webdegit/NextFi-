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
    '0x1960E8aAA582DCdCB8C03c5e75A6265414Ec7D47',
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
