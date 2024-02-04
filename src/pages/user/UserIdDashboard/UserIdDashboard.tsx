import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export const UserIdDashboard = () => {
  return (
    <HStack
      w="full"
      bgColor={useColorModeValue('gray.50', 'gray.800')}
      minH="100vh"
      spacing={5}
    ></HStack>
  );
};
