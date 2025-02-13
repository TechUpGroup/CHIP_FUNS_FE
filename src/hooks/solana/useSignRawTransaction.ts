import { RpcResponseAndContext, SignatureStatus, Transaction } from '@solana/web3.js';
import { useCallback } from 'react';

import { useAnchorProvider } from '@/hooks/solana/useAnchorProvider';
import { sleep } from '@/utils';

export const useSignRawTransaction = () => {
  const anchorProvider = useAnchorProvider();
  const signRawTransaction = useCallback(
    async (signatureRaw: string) => {
      if (!anchorProvider) throw new Error('Provider not found');
      const { wallet, connection } = anchorProvider;
      const decodedTx = Buffer.from(signatureRaw, 'base64');
      const transaction = Transaction.from(decodedTx);

      const transactionSigned = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(transactionSigned.serialize(), {
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
          await sleep(1000);
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
    [anchorProvider],
  );
  return signRawTransaction;
};
