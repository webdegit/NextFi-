import {
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  VStack,
} from '@chakra-ui/react';
import { FcGoodDecision } from 'react-icons/fc';

export const RegistrationUi = () => {
  return (
    <VStack>
      <HStack>
        <Heading>Register</Heading>
        <Icon as={FcGoodDecision} boxSize={8}></Icon>
        <Divider />
      </HStack>
      <Flex
        w="300px"
        borderRadius="50px"
        p={5}
        borderWidth="thick"
        direction="column"
        gap={2}
      >
        <Flex direction="column">
          <Input
            h={20}
            borderWidth="thick"
            borderRadius="3xl"
            placeholder="Referral Id"
            fontSize="xl"
          ></Input>
        </Flex>
        <Flex direction="column">
          <Input
            h={20}
            borderWidth="thick"
            borderRadius="3xl"
            isReadOnly
            placeholder="10 USDT"
            fontSize="xl"
          ></Input>
        </Flex>
        <VStack w="full">
          <Button
            h={16}
            w="full"
            borderRadius="full"
            bg="pink.500"
            _hover={{
              bg: 'pink.400',
            }}
            colorScheme="pink"
          >
            Register Now
          </Button>
        </VStack>
      </Flex>
    </VStack>
  );
};
