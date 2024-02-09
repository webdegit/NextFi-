import { bscTestnet, polygon } from 'viem/chains';
import { GlobalFiUpgradeable } from './ContractAddress';

export const ProjectName = 'GlobalFi';

export type SupportedNetworkInfoType = {
  [key: number]: {
    icon: string;
    referralContract: `0x${string}`;
  };
};

export const supportedNetworkInfo: SupportedNetworkInfoType = {
  [bscTestnet.id]: {
    icon: '/currencyLogos/bnb.svg',
    referralContract: GlobalFiUpgradeable?.contractAddress?.[97],
  },
  
  [polygon?.id]: {
    icon: '/currencyLogos/polygon.svg',
    referralContract: GlobalFiUpgradeable?.contractAddress?.[137],
  },
};
