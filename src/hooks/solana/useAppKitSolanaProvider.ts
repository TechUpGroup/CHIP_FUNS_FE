import { useAppKitProvider } from '@reown/appkit/react';
import type { Provider } from '@reown/appkit-adapter-solana';

export const useAppKitSolanaProvider = () => {
  return useAppKitProvider<Provider>('solana');
};
