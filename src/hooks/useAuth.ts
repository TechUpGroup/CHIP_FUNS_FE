import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';

import useUserStore from '@/store/useUserStore';

export class WalletConnectorNotFoundError extends Error {}
export class WalletSwitchChainError extends Error {}

const useAuth = () => {
  const setUser = useUserStore((state) => state.setUser);
  const { disconnect } = useWallet();

  const logout = useCallback(async () => {
    try {
      await disconnect();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }, [disconnect, setUser]);

  return { logout };
};

export default useAuth;
