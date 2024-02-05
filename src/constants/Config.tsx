import { bscTestnet, polygon } from 'viem/chains';

export const ProjectName = 'GlobalFi';

export type SupportedNetworkInfoType = {
  [key: number]: {
    icon: string;
  };
};

export const supportedNetworkInfo: SupportedNetworkInfoType = {
  [polygon?.id]: {
    icon: '/currencyLogos/polygon.svg',
  },
  [bscTestnet.id]: {
    icon: '/currencyLogos/bnb.svg',
  },
};
