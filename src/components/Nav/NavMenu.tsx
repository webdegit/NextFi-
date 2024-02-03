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
  Tooltip,
} from '@chakra-ui/react';
import { ConnectWalletButton } from '../ConnectWalletButton';
import { IconType } from 'react-icons';
import { NavUserMenuObject } from './NavUserMenuObject';
import { FcGoodDecision } from 'react-icons/fc';
import { AccountActionButton } from '../AccountActionButton';
import { useAccount } from 'wagmi';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';

const MenuIcons = ({
  heading,
  icon,
  route,
  onClick,
}: {
  heading?: string;
  icon: IconType;
  route: string;
  onClick: () => void;
}) => {
  return (
    <Tooltip
      label={heading}
      placement="right-start"
      hasArrow
      p={2}
      borderRadius="xl"
      fontWeight="bold"
    >
      <Center
        boxSize={16}
        borderWidth="thin"
        borderRadius="3xl"
        cursor="pointer"
        boxShadow="base"
        bgColor={useColorModeValue('blackAlpha.50', 'blackAlpha.200')}
        as={Link}
        to={route}
        onClick={onClick}
      >
        <Icon as={icon} boxSize={6}></Icon>
      </Center>
    </Tooltip>
  );
};

const NavUserMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      {NavUserMenuObject.map((menuObject, key) => {
        return (
          <VStack>
            <MenuIcons
              key={key}
              icon={menuObject?.icon}
              heading={menuObject?.heading}
              route={menuObject?.to}
              onClick={onClose}
            ></MenuIcons>
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
        icon={<HiMenuAlt2 size={27} />}
        onClick={onOpen}
        size={['md', 'lg']}
        variant="ghost"
        borderRadius="full"
      ></IconButton>
      <Drawer
        isOpen={isOpen}
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
          //   bg="blackAlpha.300"
          backdropFilter="blur(10px)"
        />
        <DrawerContent
          //   borderTopRadius="3xl"
          bgColor={useColorModeValue('whiteAlpha.900', '#191A1A')}
          backdropFilter="blur(10px)"
          py={5}
          borderRadius={'100px,0,0,0'}
          borderLeftWidth={useBreakpointValue(
            {
              base: 0,
              md: 'thick',
            },
            {
              fallback: 'base',
            }
          )}
          borderLeftRadius={useBreakpointValue(
            {
              base: 0,
              md: 75,
            },
            {
              fallback: 'md',
            }
          )}
          borderTopWidth={useBreakpointValue(
            {
              base: 'thick',
              md: 0,
            },
            {
              fallback: 'md',
            }
          )}
        >
          <DrawerCloseButton />
          <DrawerHeader>
            {address ? (
              <HStack>
                <ConnectWalletButton onClick={onClose} />
                <AccountActionButton address={address} />
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
                <NavUserMenu onClose={onClose} />
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
              px={10}
              rightIcon={<FcGoodDecision />}
              as={Link}
              to="/register"
              onClick={onClose}
              variant="outline"
              h={14}
              minW={200}
              borderRadius="full"
              colorScheme="green"
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
