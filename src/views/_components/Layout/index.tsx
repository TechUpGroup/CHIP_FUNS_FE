'use client';

import { Suspense } from 'react';
import { FlexCol } from '@/components/Flex';
import Providers from '@/providers';
import { scrollbarHiddenStyle } from '@/utils/styles/scrollbar';

import Header from './Header';
import Global from '../Global';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <Global />
      <FlexCol as="main" h="100dvh" w="100dvw" overflow="auto" css={scrollbarHiddenStyle}>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <FlexCol
          flex={1}
          css={scrollbarHiddenStyle}
          alignItems="stretch"
          overflow="auto"
          px={{ base: 2.5, md: '20px', lg: '20px', xl: '30px', '2xl': '120px' }}
        >
          {children}
        </FlexCol>
      </FlexCol>
    </Providers>
  );
};
