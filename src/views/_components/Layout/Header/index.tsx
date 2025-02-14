'use client';

import { Flex } from '@chakra-ui/react';
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Currency } from '@/components/Currency';
import { FlexCenter } from '@/components/Flex';
import { ChipsIcon, LogoIcon, LogoMobileIcon, PlusIcon } from '@/components/Icons';
import { ImageRatio } from '@/components/Image';
import { LinkCustom } from '@/components/LinkCustom';
import { Text24 } from '@/components/Text';
import { SYMBOL_TOKEN } from '@/enums/token.enum';
import { useUser } from '@/store/useUserStore';
import { DepositDialog } from './DepositDialog';
import { WithdrawDialog } from './WithdrawDialog';

export default function HeaderComponent() {
  const { setVisible } = useWalletModal();
  const { buttonState, publicKey } = useWalletMultiButton({
    onSelectWallet() {
      setVisible(true);
    },
  });
  const user = useUser();

  return (
    <FlexCenter
      h={{ base: '60px', md: '100px' }}
      px={{ base: 2.5, md: '20px', lg: '30px', xl: '40px', '2xl': '120px' }}
      py={2.5}
      bg="bgGame"
      justify="space-between"
      gap={1}
    >
      <LinkCustom href="/">
        <LogoIcon hideBelow="md" />
        <LogoMobileIcon hideFrom="md" />
      </LinkCustom>
      {!publicKey ? (
        <Button
          onClick={() => setVisible(true)}
          disabled={buttonState === 'connected'}
          loading={buttonState === 'connecting'}
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
      ) : (
        <FlexCenter gap={{ base: 1, md: 4 }} flex={1} justify="end">
          <Link href="/claim">
            <Text24
              fontWeight={800}
              color="white"
              lineHeight={1}
              px={{ base: 1, md: 6 }}
              py={{ base: 2, md: 4 }}
              // border="2px solid #96F048"
              bg="#15181D"
              fontSize={{ base: 14, md: 20 }}
              rounded={10}
            >
              CLAIM
            </Text24>
          </Link>
          <FlexCenter
            bg="bgMain"
            rounded={10}
            p={{ base: 1, md: 2 }}
            minW={{ base: 'unset', md: 420 }}
            flex={{ base: 1, md: 'unset' }}
            gap={{ base: 1, md: 2 }}
          >
            <FlexCenter flex={1} gap={2}>
              <ChipsIcon w={{ base: 6, md: 8 }} />
              <Flex
                fontSize={{ base: 14, md: 20 }}
                lineHeight={1}
                fontWeight={800}
                color="white"
                flexDir={{ base: 'column', md: 'row' }}
              >
                <Currency value={user?.balance} isWei /> {SYMBOL_TOKEN}
              </Flex>
            </FlexCenter>

            <WithdrawDialog />
            <DepositDialog />
          </FlexCenter>
          <Link href="/profile">
            <ImageRatio
              src="/icons/avatar.png"
              ratio={1}
              w={{ base: 9, md: '56px' }}
              rounded="full"
              border="4px solid"
              borderColor="bgMain"
            />
          </Link>
        </FlexCenter>
      )}
    </FlexCenter>
  );
}
