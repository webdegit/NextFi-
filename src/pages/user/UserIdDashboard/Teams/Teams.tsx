import { ArrowDownIcon } from '@chakra-ui/icons';
import {
  Divider,
  Heading,
  Icon,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack,
  Wrap
} from '@chakra-ui/react';
import { FaUserTie } from 'react-icons/fa';
import { HiMiniUser, HiMiniUsers } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import { UserTeamCard } from '../../../../components/UserTeamCard';
import { UserTeamTableRow } from '../../../../components/UserTeamTable/UserTeamTableRow';
import {
  UserIdAccountType,
  UserTeamType,
  useGetIdAccount,
} from '../../../../hooks/useReferralContract';

export const Teams = () => {
  const { userId } = useParams();
  const userIdAccountHook = useGetIdAccount(userId!);
  const userIdAccount = userIdAccountHook?.data as unknown as UserIdAccountType;

  const referrer = userIdAccount?.referrerId;
  const directReferee = userIdAccount?.refereeIds;
  const team = userIdAccount?.team as UserTeamType[];

  return (
    <VStack spacing={5}>
      {userIdAccountHook?.isFetched ? (
        <>
          <UserTeamCard
            heading="Referrer"
            userId={Number(referrer)}
            icon={FaUserTie}
          />

          <Icon as={ArrowDownIcon}></Icon>

          <UserTeamCard
            heading="You"
            userId={Number(userId)}
            icon={HiMiniUser}
          />

          <Icon as={ArrowDownIcon}></Icon>
          
          <Wrap justify="center">
            {directReferee?.map((refereeId: bigint, key: number) => {
              return (
                <UserTeamCard
                  heading="Referee"
                  userId={Number(refereeId)}
                  icon={HiMiniUsers}
                  key={key}
                />
              );
            })}
          </Wrap>
          <Divider />
          <Heading>Team</Heading>
          {team?.length > 0 ? (
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
                  {team?.map((teamObject: UserTeamType, key: number) => {
                    return (
                      <UserTeamTableRow
                        teamObject={teamObject}
                        key={key}
                      ></UserTeamTableRow>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Heading color="red" size="lg">
              You don't have team.
            </Heading>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </VStack>
  );
};
