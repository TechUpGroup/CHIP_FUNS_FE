import { useAppKitAccount } from '@reown/appkit/react';
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useSolanaBalance = () => {
  const { address } = useAppKitAccount();
  const { connection } = useAppKitConnection();

  const { data: balance, isLoading: loading } = useQuery({
    queryKey: ['solana-balance', address],
    queryFn: async () => {
      if (address) {
        try {
          const balance = await connection?.getBalance(new PublicKey(address));
          return balance;
        } catch {
          return null;
        }
      } else {
        return null;
      }
    },
    refetchInterval: 5000,
  });

  return { balance, loading };
};

export const useSolanaBalanceToken = (tokenAddress: PublicKey | string, isToken2002?: boolean) => {
  const { address } = useAppKitAccount();
  const { connection } = useAppKitConnection();

  const tokenUserATA = useMemo(
    () =>
      address
        ? getAssociatedTokenAddressSync(
            typeof tokenAddress === 'string' ? new PublicKey(tokenAddress) : tokenAddress,
            new PublicKey(address),
            undefined,
            isToken2002 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID,
          )
        : undefined,
    [address, tokenAddress, isToken2002],
  );

  const { data: balance, isLoading: loading } = useQuery({
    queryKey: ['solana-balance-token', tokenUserATA],
    queryFn: async () => {
      if (tokenUserATA) {
        try {
          const balance = await connection?.getTokenAccountBalance(tokenUserATA);
          return balance?.value;
        } catch {
          return null;
        }
      } else {
        return null;
      }
    },
    refetchInterval: 5000,
  });

  return { balance, loading };
};
