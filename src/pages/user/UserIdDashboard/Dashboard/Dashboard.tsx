import { VStack, Wrap } from '@chakra-ui/react';
import { IoWalletOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { useChainId } from 'wagmi';
import { BalancesContainer } from '../../../../components/Dashboard/BalancesContainer';
import { DashboardDataContainer } from '../../../../components/Dashboard/DashboardDataContainer';
import { MainHeading } from '../../../../components/Dashboard/MainHeading';
import { supportedNetworkInfo } from '../../../../constants/Config';
import { FaIdCardAlt, FaUser, FaUserFriends } from 'react-icons/fa';
import { FaShop, FaUserGroup } from 'react-icons/fa6';
import { HiOutlineUserGroup, HiOutlineUsers, HiUserGroup } from 'react-icons/hi';

export const Dashboard = () => {
  const chain = useChainId();
  const currentNetwork = supportedNetworkInfo[chain];
  return (
    <VStack>
      <MainHeading heading="Dashboard" icon={RxDashboard}></MainHeading>
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
              />
              <BalancesContainer
                // image={`/currencyLogos/usdt.svg`}
                icon={FaUserFriends}
                heading="Direct"
                balance={1000}
              />
              <BalancesContainer
                // image={`/currencyLogos/usdt.svg`}
                icon={FaUserGroup}
                heading="Team"
                balance={1000}
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
      </Wrap>
    </VStack>
  );
};
