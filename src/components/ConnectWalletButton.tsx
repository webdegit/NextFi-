import { Button, Image } from '@chakra-ui/react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import React from 'react';
import { useAccount } from 'wagmi';
import { shortenAddress } from '../utils/shortenAddress';

export const ConnectWalletButton = ({ onClick }: { onClick?: () => void }) => {
  const { open } = useWeb3Modal();
  const { address, isConnecting } = useAccount();
  return (
    <Button
      onClick={() => {
        open();
        onClick?.();
      }}
      isLoading={isConnecting}
      loadingText="Connecting..."
      leftIcon={<Image src="/WalletConnectGradientLogo.png" maxW={8}></Image>}
    >
      {!address ? 'Connect Wallet' : shortenAddress(address)}
    </Button>
  );
};
