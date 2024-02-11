import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import {
  UserIdAccountType,
  UserTeamType,
  useGetIdAccount,
  useGetUserAccount,
} from '../../hooks/useReferralContract';

export const UserTeamTableRow = ({
  teamObject,
}: {
  teamObject: UserTeamType;
}) => {
  const userIdAccount = useGetIdAccount(Number(teamObject?.teamId))
    ?.data as unknown as UserIdAccountType;
  return (
    <Tr>
      <Td>{Number(teamObject?.teamId)}</Td>
      <Td>{userIdAccount?.owner}</Td>
      <Td>{Number(teamObject?.teamLevel)}</Td>
      <Td>{Number(userIdAccount?.referrerId)}</Td>
    </Tr>
  );
};
