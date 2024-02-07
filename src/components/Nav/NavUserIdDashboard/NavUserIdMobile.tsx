import {
  Box,
  Collapse,
  HStack,
  Heading,
  Icon,
  PopoverArrow,
  Spacer,
  Text,
  VStack,
  flexbox,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { Link, useNavigate } from 'react-router-dom';
import {
  NavUserIdDashboardObject,
  navUserIdDashboardObjectFunction,
} from './NavUserIdDashboardObject';

const CollapseMenu = ({
  heading,
  icon,
  to,
  onClick,
}: {
  heading?: string;
  icon?: IconType;
  to?: string;
  onClick?: () => void;
}) => {
  return (
    <HStack
      w="60vw"
      maxW={900}
      minW={250}
      as={Link}
      to={to}
      onClick={onClick}
      borderWidth="thin"
      _hover={{
        borderColor: 'pink',
      }}
      //   borderColor="pink"
      p={2}
      borderRadius="3xl"
    >
      <Text>{heading}</Text>
      <Spacer />
      <Icon as={icon} color="pink.500"></Icon>
    </HStack>
  );
};

export const NavUserIdMobile = ({ userId }: { userId: string | number }) => {
  const { isOpen, onOpen, onToggle } = useDisclosure();
  // const [menu, setMenu] = useState(NavUserIdDashboardObject?.[2]);
  const [menu, setMenu] = useState(
    navUserIdDashboardObjectFunction(userId)?.[2]
  );

  return (
    <VStack w="full" px={7}>
      <Box
        p={2}
        borderRadius="3xl"
        borderWidth="thick"
        borderColor="pink"
        onClick={onToggle}
      >
        <CollapseMenu
          heading={menu?.heading}
          icon={menu?.icon}
          // to={menu?.heading}
          //   onClick={onToggle}
        ></CollapseMenu>
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <VStack borderWidth="thin" p={2} borderRadius="3xl">
          {/* <PopoverArrow /> */}
          {navUserIdDashboardObjectFunction(userId)?.map(
            (navMenuObject, key) => {
              return (
                <CollapseMenu
                  key={key}
                  onClick={() => {
                    onToggle();
                    setMenu(navMenuObject);
                  }}
                  heading={navMenuObject?.heading}
                  icon={navMenuObject?.icon}
                  to={navMenuObject?.to}
                ></CollapseMenu>
              );
            }
          )}
        </VStack>
      </Collapse>
    </VStack>
  );
};
