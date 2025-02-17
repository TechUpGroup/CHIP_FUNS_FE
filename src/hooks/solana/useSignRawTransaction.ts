import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import { RpcResponseAndContext, SignatureStatus, Transaction } from '@solana/web3.js';
import { useCallback } from 'react';

import { sleep } from '@/utils';
import { useAppKitSolanaProvider } from './useAppKitSolanaProvider';

export const useSignRawTransaction = () => {
  const { walletProvider } = useAppKitSolanaProvider();
  const { connection } = useAppKitConnection();

  const signRawTransaction = useCallback(
    async (signatureRaw: string) => {
      if (!connection || !walletProvider) throw new Error('Provider not found');
      const decodedTx = Buffer.from(signatureRaw, 'base64');
      const transaction = Transaction.from(decodedTx);

      const signature = await walletProvider.signAndSendTransaction(transaction, {
        skipPreflight: true,
        preflightCommitment: 'confirmed',
        maxRetries: 50,
      });
      let result: RpcResponseAndContext<SignatureStatus | null> | null = null;
      let isSuccess = false;
      let retryCount = 0;
      while (!isSuccess && retryCount < 50) {
        result = await connection.getSignatureStatus(signature, {
          searchTransactionHistory: true,
        });
        if (!result?.value) {
          await sleep(3_000);
        } else {
          isSuccess = true;
        }
        retryCount++;
      }
      // const confirmedTx = await connection.confirmTransaction(
      //   {
      //     blockhash,
      //     lastValidBlockHeight,
      //     signature,
      //   },
      //   'confirmed',
      // );
      console.log('result: ', result);
      console.log('retryCount: ', retryCount);
      if (result?.value?.confirmationStatus !== 'confirmed') {
        throw new Error('Transaction fail!');
      }
      return signature;
    },
    [walletProvider, connection],
  );
  return signRawTransaction;
};
