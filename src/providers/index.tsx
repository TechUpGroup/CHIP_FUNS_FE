'use client';

import ChakraProvider from './chakra';
import QueryProvider from './react-query';

export default function Providers({ children }: React.PropsWithChildren & { cookies?: string | null }) {
  return (
    <ChakraProvider>
      <QueryProvider>{children}</QueryProvider>
    </ChakraProvider>
  );
}
