import { Button, Flex, Heading, Image, Text, Wrap } from '@chakra-ui/react';
import React from 'react';
import { ProjectName } from '../../constants/Config';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Wrap
      w="full"
      justify={'space-around'}
      minH={'95vh'}
      py={20}
      spacing={10}
      align="center"
    >
      <Flex direction="column" gap={10} px={5}>
        <Text
          fontSize={['7xl', '8xl', '9xl']}
          lineHeight={1}
          fontWeight={900}
          color="pink.500"
        >
          {ProjectName}
        </Text>
        <Heading 
          maxW="20ch" 
          fontSize={['7xl', '8xl', '9xl']}
          fontWeight={600}>
          A Fully Decentralized Reward Distribution Protocol built on secured
          smart contracts.
        </Heading>
        <Button
          size="lg"
          rightIcon={<ArrowForwardIcon />}
          py={10}
          colorScheme="purple"
          bg="purple.500"
          _hover={{
            bg: 'purple.400',
          }}
          //   bgGradient='linear(to-r, red.500, yellow.500, blue)'
          borderRadius="full"
          //   color="white"
          as={Link}
          to="/register"
        >
          Register Now
        </Button>
      </Flex>
      <Image src="/header.png" maxW={500} w="full"></Image>
      
    </Wrap>
  );
};
