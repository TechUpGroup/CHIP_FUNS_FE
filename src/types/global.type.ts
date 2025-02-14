import type { SendOptions, Transaction, TransactionSignature, VersionedTransaction } from '@solana/web3.js';
import type EventEmitter from 'events';

interface PhantomWallet extends EventEmitter {
  isPhantom?: boolean;
  publicKey?: { toBytes(): Uint8Array };
  isConnected: boolean;
  signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
  signAndSendTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T,
    options?: SendOptions,
  ): Promise<{ signature: TransactionSignature }>;
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

declare global {
  interface Window {
    phantom?: {
      solana?: PhantomWallet;
    };
    // solana?: PhantomWallet;
  }
}

// If you're using ES modules, you might want to export something to make it a module
export {};
