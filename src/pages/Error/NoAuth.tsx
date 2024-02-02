import { Flex, HStack, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ConnectWalletButton } from '../../components/ConnectWalletButton';
import { AiOutlineDisconnect } from 'react-icons/ai';

export const NoAuth = () => {
  return (
    <Flex minH="100vh" flex={1} align="center" justify="center">
      <VStack>
        <Icon as={AiOutlineDisconnect} boxSize={200} color="red"></Icon>
        <Text
          fontSize={['5xl']}
          fontWeight={900}
          color="red"
          textAlign="center"
          lineHeight={1}
        >
          You are not connected.
        </Text>
        <Text textAlign="center" fontSize="2xl">
          Please connect wallet to continue.
        </Text>
        <ConnectWalletButton />
      </VStack>
    </Flex>
  );
};
