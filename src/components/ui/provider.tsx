'use client';

import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react';

import { ColorModeProvider } from './color-mode';

export function Provider(props: ChakraProviderProps) {
  return (
    <ChakraProvider value={props.value}>
      <ColorModeProvider forcedTheme="light">{props.children}</ColorModeProvider>
    </ChakraProvider>
  );
}
