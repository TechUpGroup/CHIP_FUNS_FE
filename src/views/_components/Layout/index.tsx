'use client';

import { FlexCol } from '@/components/Flex';
import Providers from '@/providers';
import { scrollbarHiddenStyle } from '@/utils/styles/scrollbar';

import { Header } from './Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <FlexCol as="main" h="100dvh" w="100dvw" overflow="hidden">
        <Header />
        <FlexCol flex={1} css={scrollbarHiddenStyle} overflow="auto" alignItems="stretch">
          {children}
        </FlexCol>
      </FlexCol>
    </Providers>
  );
};
