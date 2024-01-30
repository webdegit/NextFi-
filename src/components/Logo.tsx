import { HStack, Heading, Hide, Image, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

export const Logo = ({ isFull = false }: { isFull?: boolean }) => {
  const [isMobile] = useMediaQuery('(max-width: 500px)');
  return (
    <HStack>
      {isFull ? (
        <Image src="/LogoFull.svg" h={14}></Image>
      ) : isMobile ? (
        <Image src="/LogoSmall.svg" h={10}></Image>
      ) : (
        <Image src="/LogoFull.svg" h={10}></Image>
      )}
    </HStack>
  );
};
