import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { HStack, Icon } from '@chakra-ui/react';
import React from 'react';

export const AccountActionButton = () => {
  return (
    <HStack>
      <Icon as={CopyIcon}></Icon>
      <Icon as={ExternalLinkIcon}></Icon>
    </HStack>
  );
};
