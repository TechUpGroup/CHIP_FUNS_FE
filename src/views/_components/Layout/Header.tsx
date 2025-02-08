'use client';

import { Button } from '@/components/Button';
import { FlexCenter } from '@/components/Flex';
import { LogoIcon, LogoMobileIcon, PlusIcon } from '@/components/Icons';
import { LinkCustom } from '@/components/LinkCustom';

export const Header = () => {
  return (
    <FlexCenter
      h={{ base: '60px', md: '100px' }}
      px={{ base: 5, md: '60px', lg: '80px', xl: '100px', '2xl': '120px' }}
      bg="rgba(30, 33, 39, 1)"
      justify="space-between"
    >
      <LinkCustom href="/">
        <LogoIcon hideBelow="md" />
        <LogoMobileIcon hideFrom="md" />
      </LinkCustom>
      <Button
        h={{ base: 8, md: 12 }}
        bg="green"
        px={{ base: 2, md: '26px' }}
        fontWeight={700}
        fontSize={{ base: 14, md: 16 }}
        gap={3}
        rounded={10}
      >
        <PlusIcon />
        CONNECT WALLET
      </Button>
    </FlexCenter>
  );
};
