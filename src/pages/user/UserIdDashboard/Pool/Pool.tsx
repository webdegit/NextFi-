import { VStack } from '@chakra-ui/react';
import { FaIdCardAlt, FaUser } from 'react-icons/fa';
import { MdPool } from 'react-icons/md';
import { BalancesContainer } from '../../../../components/Dashboard/BalancesContainer';
import { DashboardDataContainer } from '../../../../components/Dashboard/DashboardDataContainer';
import { useParams } from 'react-router-dom';
import { UserIdAccountType, useGetIdAccount } from '../../../../hooks/useReferralContract';
import { weiToDecimals } from '../../../../utils/weiToDecimals';

export const Pool = () => {
  const { userId } = useParams();
  const userIdAccount = useGetIdAccount(userId ?? 0)
    ?.data as unknown as UserIdAccountType;
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
              balance={weiToDecimals(userIdAccount?.rewards?.globalRewards)}
              balaceCurrencyImage={`/currencyLogos/usdt.svg`}
            />
            <BalancesContainer
              // image={`/currencyLogos/usdt.svg`}
              icon={FaIdCardAlt}
              heading="Current Pool"
              balance={1}
              // balaceCurrencyImage={`/currencyLogos/usdt.svg`}
            />
          </VStack>
        }
      ></DashboardDataContainer>
    </VStack>
  );
};
