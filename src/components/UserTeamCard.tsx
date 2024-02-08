import {
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { DashboardDataContainer } from './Dashboard/DashboardDataContainer';
import { FaHandHoldingHeart, FaHospitalUser } from 'react-icons/fa';
import { BalancesContainer } from './Dashboard/BalancesContainer';
import { HiUserPlus } from 'react-icons/hi2';
import { TiUserAdd } from 'react-icons/ti';
import { MdPool } from 'react-icons/md';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { IconType } from 'react-icons';
import { FaClipboardUser } from 'react-icons/fa6';
import { HiUserGroup } from 'react-icons/hi';

export const UserTeamCard = ({
  heading,
  userId,
  icon,
}: {
  heading: string;
  userId: number;
  icon: IconType;
}) => {
  return (
    <DashboardDataContainer
      heading={heading}
      icon={icon}
      children={
        <VStack spacing={2}>
          <BalancesContainer
            // image={`${currentNetwork?.icon}`}
            icon={FaClipboardUser}
            heading="User Id"
            balance={userId}
            // balaceCurrencyImage={
            //   showCurrencyLogo ? `/currencyLogos/usdt.svg` : undefined
            // }
          />
          <BalancesContainer
            // image={`${currentNetwork?.icon}`}
            icon={HiUserPlus}
            heading="Direct Team"
            balance={userId}
            // balaceCurrencyImage={`/currencyLogos/usdt.svg`}
          />
          <BalancesContainer
            // image={`${currentNetwork?.icon}`}
            icon={HiUserGroup}
            heading="Team"
            balance={userId}
            // balaceCurrencyImage={`/currencyLogos/usdt.svg`}
          />
          <Button>Open User Dashboard</Button>
        </VStack>
      }
    ></DashboardDataContainer>
  );
};
