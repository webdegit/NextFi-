import { VStack } from '@chakra-ui/react';
import { FaUser, FaUserFriends } from 'react-icons/fa';
import { FaShop, FaUserGroup } from 'react-icons/fa6';
import { BalancesContainer } from '../../../../components/Dashboard/BalancesContainer';
import { DashboardDataContainer } from '../../../../components/Dashboard/DashboardDataContainer';

export const Business = () => {
  const businessArray = [
    {
      heading: 'Ids Business',
      value: `${1000} USDT`,
    },
    {
      heading: 'Direct Business',
      value: `${1000} USDT`,
    },
    {
      heading: 'Team Business',
      value: `${1000} USDT`,
    },
  ];
  return (
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
  );
};
