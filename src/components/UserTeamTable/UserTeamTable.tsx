import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

export const UserTeamTable = () => {
  return (
    <TableContainer w="full">
      <Table variant="simple">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>User ID</Th>
            <Th>Address</Th>
            <Th>Level</Th>
            <Th>Referrer by</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* {team?.map((userIds: UserTeamType, key: number) => {
            return (
              <Tr key={key}>
                <Td>{Number(userIds?.teamId)}</Td>
                <Td>{1}</Td>
                <Td>{Number(userIds?.teamLevel)}</Td>
                <Td>{1}</Td>
              </Tr>
            );
          })} */}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
