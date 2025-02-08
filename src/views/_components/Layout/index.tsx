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
        <FlexCol
          flex={1}
          css={scrollbarHiddenStyle}
          overflow="auto"
          alignItems="stretch"
          px={{ base: 2.5, md: '60px', lg: '80px', xl: '100px', '2xl': '120px' }}
        >
          {children}
        </FlexCol>
      </FlexCol>
    </Providers>
  );
};
