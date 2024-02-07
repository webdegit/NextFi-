import { erc20Abi } from 'viem';
import GlobalFiUpgradeableABI from '../contracts/artifacts/contracts/GlobalFIUpgradeable.sol/GlobalFiUpgradeable.json';

export const USDT = {
  contractAddress: {
    97: '0xDAE0b6BC392004435bC6743bf2443D17b095D7E7',
    137: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  },
  abi: erc20Abi,
};

export const GlobalFiUpgradeable = {
  contractAddress: {
    97: '0x1960E8aAA582DCdCB8C03c5e75A6265414Ec7D47',
    137: '',
  },
  abi: GlobalFiUpgradeableABI,
};