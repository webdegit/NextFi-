import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Spacer,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';
import { FcGoodDecision, FcNeutralDecision } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const UserIdCard = ({ userId }: { userId: number }) => {
  return (
    <VStack
      borderRadius="3xl"
      borderWidth="thin"
      minW={150}
      minH={200}
      p={2}
      as={Link}
      to={`/user/userIdDashboard/${userId}`}
      cursor="pointer"
    >
      <HStack>
        <Text>UserId</Text>
        <Spacer />
        <Text fontWeight={900} color="twitter.500">
          #{userId}
        </Text>
      </HStack>
      <Divider />
    </VStack>
  );
};

const InactiveAccountComponent = () => {
  return (
    <VStack>
      <Icon boxSize={100} as={FcNeutralDecision}></Icon>
      <Heading color="red">You account is not active yet.</Heading>
      <Text>Please register to activate your account.</Text>
      <Button
        w={250}
        h={14}
        borderRadius="full"
        bg="twitter.500"
        _hover={{
          bg: 'twitter.400',
        }}
        colorScheme="twitter"
        color="white"
        rightIcon={<ArrowForwardIcon />}
      >
        Register
      </Button>
    </VStack>
  );
};

export const UserIdDisplay = () => {
  const userIds = [1, 2, 3, 4, 5];
  // const userIds: any = [];
  return (
    <VStack py={[10, 20]} spacing={10}>
      {userIds.length > 0 ? (
        <>
          <VStack>
            <Heading color="pink.500">Your user ids</Heading>
            <Text>Please select an id to go to dashboard.</Text>
          </VStack>
          <Wrap justify="center" align="center">
            {userIds.map((userId: any, key: number) => {
              return <UserIdCard userId={userId} key={key}></UserIdCard>;
            })}
          </Wrap>
        </>
      ) : (
        <InactiveAccountComponent></InactiveAccountComponent>
      )}
    </VStack>
  );
};
