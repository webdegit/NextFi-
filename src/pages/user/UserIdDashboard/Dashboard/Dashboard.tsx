import { VStack, Wrap } from '@chakra-ui/react';
import { IoWalletOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { useAccount, useBalance, useChainId, useConfig } from 'wagmi';
import { BalancesContainer } from '../../../../components/Dashboard/BalancesContainer';
import { DashboardDataContainer } from '../../../../components/Dashboard/DashboardDataContainer';
import { MainHeading } from '../../../../components/Dashboard/MainHeading';
import { supportedNetworkInfo } from '../../../../constants/Config';
import { FaIdCardAlt, FaUser, FaUserFriends } from 'react-icons/fa';
import { HiUserPlus } from 'react-icons/hi2';
import { MdPool, MdSpaceDashboard } from 'react-icons/md';
import { FaHandHoldingHeart, FaShop, FaUserGroup } from 'react-icons/fa6';
import {
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiUserGroup,
} from 'react-icons/hi';
import {
  UserIdAccountType,
  useGetIdAccount,
} from '../../../../hooks/useReferralContract';
import { weiToDecimals } from '../../../../utils/weiToDecimals';

export const Dashboard = () => {
  const { address } = useAccount();
  const userIdAccount = useGetIdAccount(1)
    ?.data as unknown as UserIdAccountType;
  const chain = useChainId();
  const currentNetwork = supportedNetworkInfo[chain];
  const userETHBalance = useBalance({
    address: address,
  });

  const userUSDTBalance = useBalance({
    address: address,
    token: currentNetwork?.tokens?.['USDT']?.contractAddress,
  });

  const config = useConfig();
  return (
    <VStack spacing={10}>
      <MainHeading heading="Dashboard" icon={MdSpaceDashboard}></MainHeading>
      <Wrap justify="center">
        <DashboardDataContainer
          heading="Balances"
          icon={IoWalletOutline}
          children={
            <VStack spacing={5}>
              <BalancesContainer
                image={`${currentNetwork?.icon}`}
                heading={userETHBalance?.data?.symbol ?? ''}
                balance={Number(
                  Number(userETHBalance?.data?.formatted)?.toFixed(3)
                )}
              />

              <BalancesContainer
                image={`/currencyLogos/usdt.svg`}
                heading={currentNetwork?.tokens?.['USDT']?.name}
                balance={Number(
                  Number(userUSDTBalance?.data?.formatted)?.toFixed(2)
                )}
              />
            </VStack>
          }
        ></DashboardDataContainer>
        <DashboardDataContainer
          heading="Business"
          icon={FaShop}
          children={
            <VStack spacing={5}>
              <BalancesContainer
                // image={`${currentNetwork?.icon}`}
                icon={FaUser}
                heading="Self"
                balance={weiToDecimals(userIdAccount?.business?.selfBusiness)}
                balaceCurrencyImage={`/currencyLogos/usdt.svg`}
              />
              <BalancesContainer
                // image={`/currencyLogos/usdt.svg`}
                icon={FaUserFriends}
                heading="Direct"
                balance={weiToDecimals(userIdAccount?.business?.directBusiness)}
                balaceCurrencyImage={`/currencyLogos/usdt.svg`}
              />
              <BalancesContainer
                // image={`/currencyLogos/usdt.svg`}
                icon={FaUserGroup}
                heading="Team"
                balance={weiToDecimals(userIdAccount?.business?.teamBusiness)}
                balaceCurrencyImage={`/currencyLogos/usdt.svg`}
              />
            </VStack>
          }
        ></DashboardDataContainer>
        <DashboardDataContainer
          heading="Team"
          icon={HiUserGroup}
          children={
            <VStack spacing={5}>
              <BalancesContainer
                // image={`${currentNetwork?.icon}`}
                icon={HiOutlineUsers}
                heading="Direct"
                balance={userIdAccount?.refereeIds?.length}
              />
              <BalancesContainer
                // image={`/currencyLogos/usdt.svg`}
                icon={HiOutlineUserGroup}
                heading="Team"
                balance={userIdAccount?.team?.length}
              />
            </VStack>
          }
        ></DashboardDataContainer>
        <DashboardDataContainer
          heading="Rewards"
          icon={FaHandHoldingHeart}
          children={
            <VStack spacing={5}>
              <BalancesContainer
                // image={`${currentNetwork?.icon}`}
                icon={HiUserPlus}
                heading="Referral"
                balance={weiToDecimals(userIdAccount?.rewards?.referralRewards)}
                balaceCurrencyImage={`/currencyLogos/usdt.svg`}
              />
              <BalancesContainer
                // image={`/currencyLogos/usdt.svg`}
                icon={MdPool}
                heading="Pool"
                balance={weiToDecimals(userIdAccount?.rewards?.globalRewards)}
                balaceCurrencyImage={`/currencyLogos/usdt.svg`}
              />
              {/* <BalancesContainer
                // image={`/currencyLogos/usdt.svg`}
                icon={MdPool}
                heading="SpillOver Rewards"
                balance={weiToDecimals(userIdAccount?.rewards?.globalRewards)}
                balaceCurrencyImage={`/currencyLogos/usdt.svg`}
              /> */}
            </VStack>
          }
        ></DashboardDataContainer>
      </Wrap>
    </VStack>
  );
};
