'use client';

import ChakraProvider from './chakra';
import QueryProvider from './react-query';
import { SolanaProvider } from './SolanaProvider';

export default function Providers({ children }: React.PropsWithChildren & { cookies?: string | null }) {
  return (
    <SolanaProvider>
      <ChakraProvider>
        <QueryProvider>{children}</QueryProvider>
      </ChakraProvider>
    </SolanaProvider>
  );
}
