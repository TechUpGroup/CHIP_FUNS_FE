import { useWallet } from '@solana/wallet-adapter-react';
import { RpcResponseAndContext, SignatureStatus, Transaction } from '@solana/web3.js';
import { useCallback } from 'react';

import { useAnchorProvider } from '@/hooks/solana/useAnchorProvider';
import { sleep } from '@/utils';

export const useSignRawTransaction = () => {
  const anchorProvider = useAnchorProvider();
  const { wallet } = useWallet();
  const signRawTransaction = useCallback(
    async (signatureRaw: string) => {
      if (!wallet?.adapter || !anchorProvider) throw new Error('Provider not found');
      const { connection } = anchorProvider;
      const decodedTx = Buffer.from(signatureRaw, 'base64');
      // const versionedTransaction = VersionedTransaction.deserialize(decodedTx);
      const transaction = Transaction.from(decodedTx);
      const signature = await wallet?.adapter.sendTransaction(transaction, connection);
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
    [wallet, anchorProvider],
  );
  return signRawTransaction;
};
