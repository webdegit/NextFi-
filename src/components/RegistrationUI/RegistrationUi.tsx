import {
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  Text,
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
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { MinContribution, supportedNetworkInfo } from '../../constants/Config';
import ReferralContractObject from '../../contracts/artifacts/contracts/GlobalFIUpgradeable.sol/GlobalFiUpgradeable.json';

export const RegistrationUi = () => {
  const { referrerId } = useParams();
  const toast = useToast();
  const [userInput, setUserInput] = useState<{
    referrerId: undefined | string;
  }>({
    referrerId: referrerId ?? undefined,
  });

  const chainId = useChainId();
  const { address } = useAccount();

  const currentNetwork = supportedNetworkInfo[chainId];
  const { data, writeContractAsync, status, reset, error } = useWriteContract();
  const result = useWaitForTransactionReceipt({
    hash: data,
  });

  console.log(data);

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
    } else {
      sendTransaction();
    }
  };

  const sendTransaction = async () => {
    try {
      // @ts-ignore
      await writeContractAsync({
        abi: ReferralContractObject?.abi,
        address: currentNetwork?.referralContract,
        functionName: 'register',
        args: [
          userInput?.referrerId,
          address,
          currentNetwork?.tokens?.['USDT']?.contractAddress,
        ],
      });
    } catch (err) {
      const errorStringify = JSON.stringify(err);
      // console.log(err);
      console.log(
        'Error Send Transaction',
        JSON.parse(errorStringify)?.details
      );

      toast({
        // @ts-ignore
        title: JSON.parse(errorStringify)?.details,
        description: data,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (result?.data?.status === 'success') {
      toast({
        title: 'Transaction Success.',
        description: (
          <VStack>
            <Text maxW={'20ch'}>{data}</Text>
            <Button colorScheme="pink">View in explorer</Button>
          </VStack>
        ),
        status: 'success',
        duration: 500000,
        isClosable: true
      });

      reset();
    } else if (result?.data?.status === 'reverted') {
      toast({
        title: 'Transaction Reverted.',
        description: <Text maxW={'20ch'}>{data}</Text>,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  });

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
            value={referrerId ? referrerId : userInput?.referrerId}
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
            onClick={prepareTransaction}
            isLoading={status === 'pending' ? true : false}
            loadingText="Transaction in progress..."
          >
            Register Now
          </Button>
        </VStack>
      </Flex>
    </VStack>
  );
};
