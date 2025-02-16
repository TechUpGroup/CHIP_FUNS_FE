'use client';

import { solana } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import React from 'react';
import { env } from '@/config';

// 0. Set up Solana Adapter
// const solanaWeb3JsAdapter = new SolanaAdapter({
//   wallets: [
//     new PhantomWalletAdapter(), new SolflareWalletAdapter()
//   ],
// });

// 2. Create a metadata object - optional
const metadata = {
  name: 'Chips.fun',
  description: 'Chips.fun',
  url: 'https://chips.fun', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// 3. Create modal
createAppKit({
  // adapters: [solanaWeb3JsAdapter],
  networks: [solana],
  metadata: metadata,
  projectId: env.projectId,
  includeWalletIds: ['0ef262ca2a56b88d179c93a21383fee4e135bd7bc6680e5c2356ff8e38301037'],
  // features: {
  //   analytics: true, // Optional - defaults to your Cloud configuration
  // },
});

export const SolanaProvider = ({ children }: React.PropsWithChildren) => {
  return children;
};
