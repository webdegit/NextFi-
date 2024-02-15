import { Divider, Heading, Icon, VStack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';

export const DashboardDataContainer = ({
  heading,
  icon,
  children,
}: {
  heading: string;
  icon: IconType;
  children: ReactNode;
}) => {
  return (
    <VStack borderWidth="thin" borderRadius="3xl" p={5} minW={200} maxW={300}>
      <Heading size="md">{heading}</Heading>
      <Divider />
      <Icon as={icon} boxSize={50}></Icon>
      <Divider />
      {children}
    </VStack>
  );
};
