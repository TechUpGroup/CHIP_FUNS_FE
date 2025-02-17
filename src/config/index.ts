export const env = {
  publicUrl: process.env.NEXT_PUBLIC_PUBLIC_URL,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  isSolanaMainnet: process.env.NEXT_PUBLIC_IS_SOLANA_MAINNET?.trim().toLowerCase() === 'true',

  address: {
    token: '8zs9HZswm7oCzB6Nbs3KdVv9UuQ1LTgYpZ518KnExxJK',
  },
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? '',
};
