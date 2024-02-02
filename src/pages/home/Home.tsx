import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Image, Text, Wrap } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ProjectName } from '../../constants/Config';

export const Home = () => {
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
        <Heading maxW="20ch">
          A Fully Decentralized Reward Distribution built on secured smart
          contracts.
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
