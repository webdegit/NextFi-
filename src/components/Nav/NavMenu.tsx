import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  Button,
  useBreakpointValue,
  Center,
  Icon,
  Wrap,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Show,
  HStack,
} from '@chakra-ui/react';
import { ConnectWalletButton } from '../ConnectWalletButton';
import { IconType } from 'react-icons';
import { NavUserMenuObject } from './NavUserMenuObject';
import { FcGoodDecision } from 'react-icons/fc';
import { AccountActionButton } from '../AccountActionButton';
import { useAccount } from 'wagmi';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link } from 'react-router-dom';

const MenuIcons = ({ heading, icon }: { heading?: string; icon: IconType }) => {
  return (
    <Center
      boxSize={16}
      borderWidth="thin"
      _hover={{
        borderWidth: "thick"
      }}
      borderRadius="3xl"
      cursor="pointer"
      boxShadow="base"
      bgColor={useColorModeValue('blackAlpha.50', 'blackAlpha.200')}
    >
      <Icon as={icon} boxSize={6}></Icon>
    </Center>
  );
};

const NavUserMenu = () => {
  return (
    <>
      {NavUserMenuObject.map((menuObject, key) => {
        return (
          <VStack>
            <MenuIcons key={key} icon={menuObject?.icon}></MenuIcons>
            <Show below="md">
              <Text>{menuObject?.heading}</Text>
            </Show>
          </VStack>
        );
      })}
    </>
  );
};

export const NavMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount();

  return (
    <>
      <IconButton
        aria-label="Nav Menu Drawer Button"
        icon={<HamburgerIcon />}
        onClick={onOpen}
      ></IconButton>
      <Drawer
        isOpen={isOpen}
        size="md"
        placement={useBreakpointValue(
          {
            base: 'bottom',
            md: 'right',
          },
          {
            fallback: 'md',
          }
        )}
        onClose={onClose}
      >
        <DrawerOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <DrawerContent
          borderTopRadius="3xl"
          bgColor={useColorModeValue('white', 'gray.900')}
        >
          <DrawerCloseButton />
          <DrawerHeader>
            {address ? (
              <HStack>
                <ConnectWalletButton onClick={onClose} />
                <AccountActionButton />
              </HStack>
            ) : null}
          </DrawerHeader>
          <DrawerBody display="flex" justifyItems="center" alignItems="center">
            <Wrap
              w="full"
              justify="center"
              direction={['row', 'row', 'column']}
            >
              {address ? (
                <NavUserMenu />
              ) : (
                <VStack>
                  <Heading color="red">You are not connected.</Heading>
                  <Text>Please connect Wallet to continue...</Text>
                  <ConnectWalletButton onClick={onClose} />
                </VStack>
              )}
            </Wrap>
          </DrawerBody>

          <DrawerFooter display="flex" gap={5} justifyContent="center">
            <Button
              onClick={onClose}
              colorScheme="red"
              rightIcon={<CloseIcon />}
            >
              Close
            </Button>
            <Button
              px={10}
              rightIcon={<FcGoodDecision />}
              as={Link}
              to="/register"
              onClick={onClose}
            >
              Register
            </Button>
            <ColorModeSwitcher />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
