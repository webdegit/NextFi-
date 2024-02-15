import { VStack } from '@chakra-ui/react';
import { FaIdCardAlt, FaUser } from 'react-icons/fa';
import { MdPool } from 'react-icons/md';
import { BalancesContainer } from '../../../../components/Dashboard/BalancesContainer';
import { DashboardDataContainer } from '../../../../components/Dashboard/DashboardDataContainer';

export const Pool = () => {
  return (
    <VStack>
      <DashboardDataContainer
        heading="Pool"
        icon={MdPool}
        children={
          <VStack spacing={5}>
            <BalancesContainer
              // image={`${currentNetwork?.icon}`}
              icon={FaUser}
              heading="Pool Income"
              balance={1000}
              balaceCurrencyImage={`/currencyLogos/usdt.svg`}
            />
            {/* <BalancesContainer
                // image={`/currencyLogos/usdt.svg`}
                icon={FaUserFriends}
                heading="Total Pool Ids"
                balance={1000}
                balaceCurrencyImage={`/currencyLogos/usdt.svg`}
              /> */}
            <BalancesContainer
              // image={`/currencyLogos/usdt.svg`}
              icon={FaIdCardAlt}
              heading="Current Pool"
              balance={1000}
              // balaceCurrencyImage={`/currencyLogos/usdt.svg`}
            />
          </VStack>
        }
      ></DashboardDataContainer>
    </VStack>
  );
};
