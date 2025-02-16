import { AnchorProvider } from '@coral-xyz/anchor';
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import { useWalletInfo } from '@reown/appkit/react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useAppKitWallet } from '@reown/appkit-wallet-button/react';
import { useMemo } from 'react';

export function useAnchorProvider() {
  const wallet = useAnchorWallet();
  const { walletInfo } = useWalletInfo();
  const { connection } = useAppKitConnection();
  // const { data: wallet } = useAppKitWallet()
  return useMemo(() => {
    if (!wallet || !connection) return undefined;
    const anchorProvider = new AnchorProvider(connection, wallet, {
      commitment: 'confirmed',
    });
    // setProvider(anchorProvider);
    return anchorProvider;
  }, [connection, wallet]);
}
