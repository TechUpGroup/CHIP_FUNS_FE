import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { useAppKitProvider } from '@reown/appkit/react';
import type { Provider } from '@reown/appkit-adapter-solana';
import { useCallback, useState } from 'react';
import { getNonce, postLogin } from '@/services/api';
import { addUserToList } from '@/store/useListUserStore';
import { useUserShallow } from '@/store/useUserStore';
import { toastError } from '@/utils/toast';
import useWalletAddress from './useWalletAddress';

export const useSignMessage = () => {
  const [loading, setLoading] = useState(false);
  const setUser = useUserShallow((s) => s.setUser);
  const { address } = useWalletAddress();
  // const { signMessage: signMessageWallet } = useWallet();
  const { walletProvider } = useAppKitProvider<Provider>('solana');

  const signMessage = useCallback(async () => {
    if (loading || !address || !walletProvider.signMessage) return;
    try {
      setLoading(true);
      setUser(null);
      const preMessage = `Welcome to chips.fun!

Click to sign in and accept the chips.fun Terms.

This request will not trigger a blockchain transaction or cost any gas fees.

Wallet address:
${address}

Nonce:
`;
      const nonce = await getNonce(address);
      const message = preMessage + nonce.nonce;

      const signatureBuffer = await walletProvider.signMessage(new TextEncoder().encode(message));
      const signature = bs58.encode(signatureBuffer);
      const login = await postLogin(address, signature ?? '', preMessage);

      setUser(login);
      addUserToList(login);
    } catch (e) {
      toastError('Sign message failed', e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [address, loading, setUser, walletProvider]);

  return { signMessage, loading };
};
