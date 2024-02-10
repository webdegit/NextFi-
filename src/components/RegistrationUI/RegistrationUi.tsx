import {
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FcGoodDecision } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import {
  useAccount,
  useBalance,
  useChainId,
  useSendTransaction,
  useWriteContract,
} from 'wagmi';
import { MinContribution, supportedNetworkInfo } from '../../constants/Config';

export const RegistrationUi = () => {
  const { referrerId } = useParams();
  const toast = useToast();
  const [inputValue, setInputValue] = useState<{
    referrerId: undefined | number;
  }>({
    referrerId: undefined,
  });

  const chainId = useChainId();
  const { address } = useAccount();

  const currentNetwork = supportedNetworkInfo[chainId];
  const { data, writeContractAsync, status } = useWriteContract();

  const userUSDTBalance = useBalance({
    address: address,
    token: currentNetwork?.tokens?.['USDT']?.contractAddress,
  });

  const prepareTransaction = () => {
    if (Number(userUSDTBalance?.data?.formatted ?? 0) < MinContribution) {
      toast({
        title: 'Value less than min contribution.',
        description: '',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {}
  };

  const sendTransaction = () => {};

  useEffect(() => {});

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
            isDisabled={referrerId ? true : false}
            value={referrerId ? referrerId : inputValue?.referrerId}
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
