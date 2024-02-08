import { Icon, VStack, Wrap } from '@chakra-ui/react';
import React from 'react';
import { UserTeamCard } from '../../../../components/UserTeamCard';
import { FaHospitalUser, FaUserTie } from 'react-icons/fa';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { HiMiniUser, HiMiniUsers } from 'react-icons/hi2';

export const Teams = () => {
  const referrer = 1;
  const directReferee = [1, 2, 3, 4, 5];
  const team = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <VStack>
      <UserTeamCard heading="Referrer" userId={referrer} icon={FaUserTie} />
      <Icon as={ArrowDownIcon}></Icon>
      <UserTeamCard heading="You" userId={referrer} icon={HiMiniUser} />
      <Icon as={ArrowDownIcon}></Icon>
      <Wrap justify="center">
        {directReferee?.map(() => {
          return (
            <UserTeamCard
              heading="Referee"
              userId={referrer}
              icon={HiMiniUsers}
            />
          );
        })}
      </Wrap>
    </VStack>
  );
};
