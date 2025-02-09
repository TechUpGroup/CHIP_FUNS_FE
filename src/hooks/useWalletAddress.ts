import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';

import { Network, networks } from '@/enums/network.enum';

export default function useWalletAddress(): {
  address: string | undefined;
  network: Network | undefined;
} {
  const { publicKey } = useWallet();
  return useMemo(
    () => ({
      address: publicKey?.toBase58(),
      network: publicKey ? networks.solana : undefined,
    }),
    [publicKey],
  );
}
