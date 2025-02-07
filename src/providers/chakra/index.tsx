'use client';

import { Provider } from '@/components/ui/provider';

import { system } from './theme';

export default function ChakraProvider({ children }: React.PropsWithChildren) {
  return <Provider value={system}>{children}</Provider>;
}
