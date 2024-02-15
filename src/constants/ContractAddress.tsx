import { erc20Abi } from 'viem';
import GlobalFiUpgradeableABI from '../contracts/artifacts/contracts/GlobalFIUpgradeable.sol/GlobalFiUpgradeable.json';

export type ContractObjectType = {
  contractAddress: {
    97: `0x${string}`;
    137: `0x${string}`;
  };
  abi: any;
};

export const USDT: ContractObjectType = {
  contractAddress: {
    97: '0xDAE0b6BC392004435bC6743bf2443D17b095D7E7',
    137: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  },
  abi: erc20Abi,
};

export const GlobalFiUpgradeable: ContractObjectType = {
  contractAddress: {
    97: '0xB4fb45FD4B9966fB4aE6a88675e3cA6475e80aC4',
    137: '0x1960E8aAA582DCdCB8C03c5e75A6265414Ec7D47',
  },
  abi: GlobalFiUpgradeableABI,
};
