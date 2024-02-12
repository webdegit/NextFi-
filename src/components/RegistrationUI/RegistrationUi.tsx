import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  Flex,
  FormControl,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  InputElementProps,
  Spacer,
  Tag,
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
import { USDT } from '../../constants/ContractAddress';
import { erc20Abi, parseEther, parseUnits } from 'viem';
import { useGetEUSDTAllowance } from '../../hooks/useERC20Hooks';
import { weiToDecimals } from '../../utils/weiToDecimals';

export const RegistrationUi = () => {
  const { referrerId } = useParams();
  const toast = useToast();
  const [userInput, setUserInput] = useState<{
    referrerId: string;
  }>({
    referrerId: referrerId ?? '',
  });

  const chainId = useChainId();
  const { address } = useAccount();

  const currentNetwork = supportedNetworkInfo[chainId];
  const { data, writeContractAsync, status, reset, error } = useWriteContract();
  const {
    data: dataApprove,
    writeContractAsync: writeContractAsyncApprove,
    status: statusApprove,
    reset: resetApprove,
    error: errorApprove,
  } = useWriteContract();
  const result = useWaitForTransactionReceipt({
    hash: data,
  });

  const resultApprove = useWaitForTransactionReceipt({
    hash: dataApprove,
  });

  const userUSDTBalance = useBalance({
    address: address,
    token: currentNetwork?.tokens?.['USDT']?.contractAddress,
  });

  const userUSDTAllowance = useGetEUSDTAllowance(
    address,
    currentNetwork?.referralContract
  );

  const hasSufficientAllowance =
    weiToDecimals(userUSDTAllowance?.data) >= MinContribution ? true : false;

  const handleReferrerInput = (e: any) => {
    setUserInput({
      referrerId: e.target.value,
    });

    console.log('Usser Referrer Input', userInput?.referrerId);
  };

  const prepareTransaction = () => {
    if (Number(userUSDTBalance?.data?.formatted ?? 0) < MinContribution) {
      toast({
        title: 'Value less than min contribution.',
        description: '',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else if (!userInput?.referrerId) {
      toast({
        title: 'Please enter referrer id.',
        description: '',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      sendTransaction();
    }
  };

  const approve = async () => {
    try {
      // @ts-ignore
      await writeContractAsyncApprove({
        abi: erc20Abi,
        address: currentNetwork?.tokens['USDT']?.contractAddress,
        functionName: 'approve',
        args: [
          currentNetwork?.referralContract,
          parseUnits(
            MinContribution?.toString(),
            currentNetwork?.tokens?.['USDT']?.decimals
          ),
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
        isClosable: true,
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

  useEffect(() => {
    if (resultApprove?.data?.status === 'success') {
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
        isClosable: true,
      });

      resetApprove();
    } else if (resultApprove?.data?.status === 'reverted') {
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
        <Text px={2}>Please enter a valid referrer id.</Text>
        <Input
          h={20}
          borderWidth="thick"
          borderRadius="3xl"
          placeholder="Referral Id"
          fontSize="xl"
          isDisabled={referrerId ? true : false}
          value={referrerId ? referrerId : userInput?.referrerId}
          onChange={(e) => handleReferrerInput(e)}
        ></Input>
        {Number(userInput?.referrerId) === 0 && (
          <Alert status="error" p={2} borderRadius="3xl">
            <AlertIcon />
            Invalid Referrer Id or not activated.
          </Alert>
        )}

        <HStack w="full" px={2}>
          <Heading size="sm">Balance</Heading>
          <Spacer />
          <Text>{userUSDTBalance?.data?.formatted}</Text>
          <Image src="/currencyLogos/usdt.svg" w={5}></Image>
        </HStack>
        <Input
          h={20}
          borderWidth="thick"
          borderRadius="3xl"
          isReadOnly
          placeholder="10 USDT"
          fontSize="xl"
        ></Input>
        {Number(userUSDTBalance?.data?.formatted) < MinContribution && (
          <Alert status="error" p={2} borderRadius="3xl">
            <AlertIcon />
            You don't have enogh USDT.
          </Alert>
        )}
        <HStack w="full">
          {!hasSufficientAllowance && (
            <Button
              w="full"
              h={14}
              borderRadius="full"
              bg="twitter.500"
              _hover={{
                bg: 'twitter.400',
              }}
              colorScheme="twitter"
              onClick={approve}
              isLoading={statusApprove === 'pending' ? true : false}
              // loadingText="Transaction in progress..."
              isDisabled={Number(referrerId) === 0}
            >
              Approve
            </Button>
          )}

          <Button
            w="full"
            h={14}
            borderRadius="full"
            bg="pink.500"
            _hover={{
              bg: 'pink.400',
            }}
            colorScheme="pink"
            onClick={prepareTransaction}
            isLoading={status === 'pending' ? true : false}
            // loadingText="Transaction in progress..."
            isDisabled={Number(referrerId) === 0 || !hasSufficientAllowance}
          >
            Register
          </Button>
        </HStack>
      </Flex>
    </VStack>
  );
};
