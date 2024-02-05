import {
  Flex,
  HStack,
  Heading,
  Hide,
  Wrap,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavUserIdDashboard } from '../../../components/Nav/NavUserIdDashboard/NavUserIdDashboard';

export const UserIdDashboard = () => {
  return (
    <Wrap w="full" py={10} px={5}>
      <Hide below="md">
        <NavUserIdDashboard userId={0} />
      </Hide>
      <Flex
        flex={1}
        w="full"
        p={5}
        direction="column"
        gap={5}
        borderWidth="thin"
        borderRadius="3xl"
      >
        <Outlet />
      </Flex>
    </Wrap>
  );
};
