import { ArrowDownIcon } from '@chakra-ui/icons';
import {
  Divider,
  Heading,
  Icon,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { FaUserTie } from 'react-icons/fa';
import { HiMiniUser, HiMiniUsers } from 'react-icons/hi2';
import { UserTeamCard } from '../../../../components/UserTeamCard';

export const Teams = () => {
  const referrer = 1;
  const directReferee = [1, 2, 3, 4, 5];
  const team = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <VStack spacing={5}>
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
      <Divider />
      <Heading>Team</Heading>
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
            {team?.map((userIds, key) => {
              return (
                <Tr key={key}>
                  <Td>{userIds}</Td>
                  <Td>{1}</Td>
                  <Td>{5}</Td>
                  <Td>{1}</Td>
                </Tr>
              );
            })}
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </VStack>
  );
};
