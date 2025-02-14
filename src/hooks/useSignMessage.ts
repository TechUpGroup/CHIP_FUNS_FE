import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { useWallet } from '@solana/wallet-adapter-react';
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
  const { signMessage: signMessageWallet } = useWallet();

  const signMessage = useCallback(async () => {
    if (loading || !address || !signMessageWallet) return;
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

      const signatureBuffer = await signMessageWallet(new TextEncoder().encode(message));
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
  }, [address, loading, setUser, signMessageWallet]);

  return { signMessage, loading };
};
