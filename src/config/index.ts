export const env = {
  publicUrl: process.env.NEXT_PUBLIC_PUBLIC_URL,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  isSolanaMainnet: process.env.NEXT_PUBLIC_IS_SOLANA_MAINNET?.trim().toLowerCase() === 'true',

  address: {
    token: 'HiEWJhkSTTQe6Uzjv2APNG659xygGKgsTTEbsZzA2Aq',
  },
};
