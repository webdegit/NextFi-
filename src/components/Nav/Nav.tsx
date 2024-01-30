import {
  Button,
  Flex,
  HStack,
  Heading,
  Hide,
  Image,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { NavMenu } from './NavMenu';
import { ConnectWalletButton } from '../ConnectWalletButton';
import { Logo } from '../Logo';

export const Nav = () => {
  return (
    <HStack
      w="full"
      px={5}
      py={3}
      bgColor={useColorModeValue('white', 'gray.900')}
      borderRadius="full"
      borderWidth="thin"
      borderColor="pink.600"
      position="sticky"
      top={0}
      zIndex={111}
    >
      <Logo></Logo>
      <Spacer />
      {/* <w3m-button /> */}
      <ConnectWalletButton />
      <NavMenu />
      <ColorModeSwitcher />
    </HStack>
  );
};
