import React from 'react';
import { DashboardDataContainer } from '../../../../components/Dashboard/DashboardDataContainer';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { VStack } from '@chakra-ui/react';
import { BalancesContainer } from '../../../../components/Dashboard/BalancesContainer';
import { HiUserPlus } from 'react-icons/hi2';
import { MdPool } from 'react-icons/md';

export const Rewards = () => {
  return (
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
  );
};
