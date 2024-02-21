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
    // 97: '0xEBBc6D7c95769F5bEc6A28F101e17b05AdF1e064',
    97: '0x71881BC29E7753A40BfD53b622f7657885B8Bc93',
    137: '0x1960E8aAA582DCdCB8C03c5e75A6265414Ec7D47',
  },
  abi: GlobalFiUpgradeableABI,
};
