'use client';

import { useAppKitProvider } from '@reown/appkit/react';
import { Provider } from '@reown/appkit-adapter-solana';
import bs58 from 'bs58';
import { useEffect, useRef } from 'react';

import useAuth from '@/hooks/useAuth';
import useWalletAddress from '@/hooks/useWalletAddress';
import { getNonce, postLogin } from '@/services/api';
import useListUserStore, { addUserToList } from '@/store/useListUserStore';
import { useUserShallow } from '@/store/useUserStore';

export function useAuthSignMessage() {
  const loading = useRef<boolean>(false);

  const { address } = useWalletAddress();
  const { walletProvider } = useAppKitProvider<Provider>('solana');

  const { logout } = useAuth();

  const setUser = useUserShallow((s) => s.setUser);
  const listUser = useListUserStore((s) => s.listUser);

  useEffect(() => {
    const updateAuth = async () => {
      if (loading.current || !address || !walletProvider) return;
      try {
        loading.current = true;
        const findUser = listUser.find((e) => e.user.address.toLowerCase() === address.toLowerCase());
        if (findUser) {
          setUser(findUser);
          return;
        }

        try {
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
          console.error(e);
          logout();
        }
      } finally {
        loading.current = false;
      }
    };
    updateAuth();
  }, [address, listUser, logout, setUser, walletProvider]);

  return null;
}
