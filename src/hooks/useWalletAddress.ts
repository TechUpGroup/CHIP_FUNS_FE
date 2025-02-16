import { useAppKitAccount } from '@reown/appkit/react';
import { useMemo } from 'react';

import { Network, networks } from '@/enums/network.enum';

export default function useWalletAddress(): {
  address: string | undefined;
  network: Network | undefined;
} {
  const { address } = useAppKitAccount();
  return useMemo(
    () => ({
      address: address,
      network: address ? networks.solana : undefined,
    }),
    [address],
  );
}
