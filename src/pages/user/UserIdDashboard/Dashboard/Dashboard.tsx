import { VStack, Wrap } from '@chakra-ui/react';
import { IoWalletOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { useChainId } from 'wagmi';
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
import { useGetIdAccount } from '../../../../hooks/useReferralContract';

export const Dashboard = () => {
  const userIdAccount = useGetIdAccount(1);
  console.log('User Id Account', userIdAccount);
  const chain = useChainId();
  const currentNetwork = supportedNetworkInfo[chain];
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
                heading="Polygon"
                balance={1000}
              />
              <BalancesContainer
                image={`/currencyLogos/usdt.svg`}
                heading="USDT"
                balance={1000}
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
                balance={10}
                balaceCurrencyImage={`/currencyLogos/usdt.svg`}
              />
              <BalancesContainer
                // image={`/currencyLogos/usdt.svg`}
                icon={FaUserFriends}
                heading="Direct"
                balance={1000}
                balaceCurrencyImage={`/currencyLogos/usdt.svg`}
              />
              <BalancesContainer
                // image={`/currencyLogos/usdt.svg`}
                icon={FaUserGroup}
                heading="Team"
                balance={1000}
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
                balance={10}
              />
              <BalancesContainer
                // image={`/currencyLogos/usdt.svg`}
                icon={HiOutlineUserGroup}
                heading="Team"
                balance={1000}
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
                balance={10}
                balaceCurrencyImage={`/currencyLogos/usdt.svg`}
              />
              <BalancesContainer
                // image={`/currencyLogos/usdt.svg`}
                icon={MdPool}
                heading="Pool"
                balance={1000}
                balaceCurrencyImage={`/currencyLogos/usdt.svg`}
              />
            </VStack>
          }
        ></DashboardDataContainer>
      </Wrap>
    </VStack>
  );
};
