import { useChainId, useReadContract } from 'wagmi';
import ReferralContractABI from '../contracts/artifacts/contracts/GlobalFIUpgradeable.sol/GlobalFiUpgradeable.json';
import { supportedNetworkInfo } from '../constants/Config';

export const useReadContractHook = (
  functionName: string,
  args: any[],
) => {
  const chainId = useChainId();
  const currentNetwork = supportedNetworkInfo[chainId];
  // @ts-ignore
  const result = useReadContract({
    abi: ReferralContractABI?.abi,
    address: currentNetwork?.referralContract,
    functionName: functionName,
    args: args ?? [],
    blockTag: "latest",
  });

  return result;
};

export type UserTeamType = {
  teamId: bigint;
  teamLevel: bigint;
};

export type UserIdAccountType = {
  business: {
    directBusiness: bigint;
    selfBusiness: bigint;
    teamBusiness: bigint;
  };
  id: bigint;
  isInPool: bigint;
  owner: `0x${string}`;
  refereeIds: bigint[];
  refereesAssigned: bigint[];
  referrerId: bigint;
  rewards: {
    globalRewards: bigint;
    referralRewards: bigint;
    spillOverRewards: bigint;
  };
  team: UserTeamType[];
};

export type UserAccountType = {
  selfAddress: `0x${string}`;
  ids: bigint[];
};

export const useGetUserAccount = (address: `0x${string}`) => {
  const result = useReadContractHook('getUserAccount', [address]);
  return result;
};

export const useGetIdAccount = (id: string | number) => {
  const result = useReadContractHook('getIdAccount', [id]);
  return result;
};
