import {
  HStack,
  Heading,
  Icon,
  Spacer,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import { NavUserIdDashboardObject } from './NavUserIdDashboardObject';

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
    <HStack w="full" as={Link} to={to}>
      <Heading size="md">{heading}</Heading>
      <Spacer />
      <Icon as={icon}></Icon>
    </HStack>
  );
};

export const NavUserIdMobile = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [menu, setMenu] = useState(NavUserIdDashboardObject);

  return (
    <VStack w="full" px={7}>
      <CollapseMenu
        heading={menu[0]?.heading}
        icon={menu[0]?.icon}
      ></CollapseMenu>
    </VStack>
  );
};
