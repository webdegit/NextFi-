import {
  Button,
  Flex,
  HStack,
  Heading,
  Hide,
  Image,
  Spacer,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { NavMenu } from './NavMenu';
import { ConnectWalletButton } from '../ConnectWalletButton';
import { Logo } from '../Logo';

export const Nav = () => {
  return (
    <VStack>
      <HStack
        w="full"
        maxW="1500px"
        px={5}
        py={7}
        //   bgColor={useColorModeValue('white', 'gray.900')}
        borderBottomRadius={[50, 75]}
        //   borderWidth="thin"
        //   borderColor="pink.600"
        position="sticky"
        top={0}
        zIndex={111}
        backdropFilter="blur(20px)"
        spacing={1}
      >
        <Logo
          imageProps={{
            maxH: [10, 12, 14, 16],
          }}
        ></Logo>
        <Spacer />
        {/* <w3m-button /> */}
        <ConnectWalletButton />
        <NavMenu />
        <Hide below="md">
          <ColorModeSwitcher size={['md', 'lg']} />
        </Hide>
      </HStack>
    </VStack>
  );
};
