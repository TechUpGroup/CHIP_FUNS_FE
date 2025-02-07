'use client';

import { FlexCol } from '@/components/Flex';
import Providers from '@/providers';
import { scrollbarHiddenStyle } from '@/utils/styles/scrollbar';

import { Footer } from './Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <FlexCol as="main" h="100dvh" w="100dvw" overflow="hidden">
        <FlexCol flex={1} css={scrollbarHiddenStyle} overflow="auto" alignItems="stretch">
          {children}
        </FlexCol>
        <Footer />
      </FlexCol>
    </Providers>
  );
};
