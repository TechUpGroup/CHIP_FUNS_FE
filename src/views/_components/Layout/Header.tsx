'use client';

import { Box } from '@chakra-ui/react';
import { Button } from '@/components/Button';
import { FlexCenter } from '@/components/Flex';
import { ChipsIcon, LogoIcon, LogoMobileIcon, PlusIcon } from '@/components/Icons';
import { ImageRatio } from '@/components/Image';
import { LinkCustom } from '@/components/LinkCustom';

export const Header = () => {
  return (
    <FlexCenter
      h={{ base: '60px', md: '100px' }}
      px={{ base: 2.5, md: '20px', lg: '30px', xl: '40px', '2xl': '120px' }}
      py={2.5}
      bg="bgGame"
      justify="space-between"
    >
      <LinkCustom href="/">
        <LogoIcon hideBelow="md" />
        <LogoMobileIcon hideFrom="md" />
      </LinkCustom>
      {true ? (
        <FlexCenter gap={{ base: 2, md: 4 }}>
          <FlexCenter bg="bgMain" rounded={10} p={2} minW={{ base: 284, md: 420 }} gap={2}>
            <FlexCenter flex={1} gap={2}>
              <ChipsIcon w={{ base: 6, md: 8 }} />
              <Box fontSize={{ base: 14, md: 20 }} lineHeight={1} fontWeight={800} color="white">
                12,356 $CHIP
              </Box>
            </FlexCenter>
            <Button
              h={{ base: 6, md: 10 }}
              border="1px solid"
              borderColor="green"
              color="green"
              rounded={8}
              px={{ base: 2, md: 13 }}
              fontWeight={600}
            >
              Withdraw
            </Button>
            <Button h={{ base: 6, md: 10 }} bg="green" rounded={8} px={{ base: 2, md: 13 }} fontWeight={600}>
              Deposit
            </Button>
          </FlexCenter>
          <ImageRatio
            src="/icons/avatar.png"
            ratio={1}
            w={{ base: 9, md: '56px' }}
            rounded="full"
            border="4px solid"
            borderColor="bgMain"
          />
        </FlexCenter>
      ) : (
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
      )}
    </FlexCenter>
  );
};
