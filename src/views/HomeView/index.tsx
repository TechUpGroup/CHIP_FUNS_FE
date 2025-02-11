'use client';

import { Box, Flex, SimpleGrid, Table } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Absolute } from '@/components/Absolute';
import { Button } from '@/components/Button';
import { Currency } from '@/components/Currency';
import { FlexCenter, FlexCol } from '@/components/Flex';
import { ArrowLink, BannerRight, ChipsIcon, GameIcon, LogoCoinFlip, TransactionIcon } from '@/components/Icons';
import { ImageRatio } from '@/components/Image';
import { LinkCustom } from '@/components/LinkCustom';
import { gameImages } from '@/constants/game.constant';
import { SYMBOL_TOKEN } from '@/enums/token.enum';
import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getGameNoti } from '@/services/user';
import { formatAddress } from '@/utils/address';
import { scrollbarStyle } from '@/utils/styles/scrollbar';

export default function HomeView() {
  const { data: noti } = useBaseQuery({
    queryKey: ['home'],
    queryFn: getGameNoti,
    refetchInterval: 5_000,
  });

  return (
    <FlexCol pt={4} w="full" flex={1} pb={10}>
      <Flex gap="1.04%" flexDirection={{ base: 'column', md: 'row' }}>
        <Flex w={{ base: '100%', md: '64.16%' }} gap="1.58%">
          <LogoCoinFlip w="64.93%" />
          <FlexCol flex={1} color="white" gap="6.7%" align="end">
            <FlexCol
              bg="linear-gradient(180deg, #96F048 0%, rgba(255, 255, 255, 0) 100%)"
              rounded={{ base: 10, md: 27 }}
              w="full"
              className="font-workSans"
              fontSize={{ base: 16, md: 24, lg: 28, xl: 32, '2xl': 46 }}
              fontWeight={500}
              lineHeight={1}
              pt={{ base: 3, md: '20px', xl: '30px' }}
              pl={{ base: 3, md: '15.6%' }}
              h={{ base: '43.64%', md: '43.64%' }}
            >
              300+
              <br />
              Games
            </FlexCol>
            <FlexCol
              bg="rgba(104, 67, 236, 1)"
              flex={1}
              pt={{ base: 2, md: '7.8%' }}
              pl={{ base: 2, md: 7 }}
              pb={{ base: 2, md: '10%' }}
              pr={2}
              justify="space-between"
              w="142%"
              rounded={{ base: 10, md: 24 }}
              gap={1}
            >
              <Box fontSize={{ base: 14, md: 18, xl: 24, '2xl': 29 }} fontWeight={700} lineHeight={1}>
                We have the best players
                <br />
                in WEB3 Games
              </Box>
              <FlexCenter gap={2}>
                <ImageRatio src="/icons/people.png" ratio={866 / 265} flex={1} maxW={216} />
                <Box fontSize={{ base: 10, md: 16, xl: 20, '2xl': 22 }} fontWeight={500} lineHeight={1}>
                  Join our Community,
                  <br />
                  We are waiting for you
                </Box>
              </FlexCenter>
            </FlexCol>
          </FlexCol>
        </Flex>
        <FlexCol flex={1} gap="7px">
          <BannerRight w="full" />
          <Button
            className="font-workSans"
            bg="green"
            rounded={{ base: 10, lg: 18, xl: 24 }}
            w="full"
            flex={{ base: 'unset', md: 1 }}
            h={{ base: 12, md: 'full' }}
            fontSize={{ base: 16, md: 32 }}
            fontWeight={500}
            gap={2}
          >
            Try Free
            <ArrowLink />
          </Button>
        </FlexCol>
      </Flex>
      <FlexCenter gap="14px" pt={{ base: 10, md: '56px' }} pb={{ base: '30px', md: 10 }}>
        <GameIcon w={{ base: 6, md: 8 }} />
        <Box fontSize={{ base: 24, md: 32 }} fontWeight={700} color="white">
          ALL GAMES
        </Box>
      </FlexCenter>
      <SimpleGrid columns={{ base: 3, lg: 4, xl: 5, '2xl': 6 }} gap={5} w="full">
        {[
          { name: 'Coin Flip Game', href: '/coin-flip', image: '/games/flip.png' },
          { name: 'Roll Dice', href: '/roll-dice', image: '/games/dice.png' },
          { name: 'Hilo', href: '/hilo', image: '/games/hilo.png' },
        ].map((e, i) => (
          <LinkCustom href={e.href} key={i}>
            <Box pos="relative" w="full">
              <ImageRatio src={e.image} ratio={1} w="full" rounded={20} />
              <Absolute display="flex" alignItems="end" justifyContent="center" w="full" h="full">
                <Box
                  fontSize={{ base: 14, lg: 16, xl: 18, '2xl': 20 }}
                  fontWeight={800}
                  lineHeight={1}
                  pb={{ base: 2, md: 3 }}
                  textAlign="center"
                  color="white"
                >
                  {e.name}
                </Box>
              </Absolute>
            </Box>
          </LinkCustom>
        ))}
      </SimpleGrid>
      <FlexCenter gap="14px" pt={{ base: 10, md: '96px' }} pb={{ base: 5, md: 6 }}>
        <TransactionIcon w={{ base: 6, md: 8 }} />
        <Box fontSize={{ base: 24, md: 32 }} fontWeight={700} color="white">
          ALL TRANSACTIONS
        </Box>
      </FlexCenter>

      <Box w="full" overflow="auto" maxH="500px" css={scrollbarStyle} bg="bgGame" color="white" rounded={10}>
        <Table.Root size="sm" unstyled>
          <Table.Header>
            <Table.Row bg="unset">
              {['GAME', 'USER', 'TIME', 'BET AMOUNT', 'REWARD PAYMENT'].map((text, i) => (
                <Table.ColumnHeader
                  key={i}
                  fontSize={{ base: 14, md: 18 }}
                  lineHeight={1.4}
                  p={5}
                  fontWeight={700}
                  color="dark"
                  minW={180}
                >
                  {text}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body fontSize={{ base: 12, md: 20 }} lineHeight={1} fontWeight={800}>
            {noti?.map((item, i) => (
              <Table.Row key={i} bg="unset">
                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5} flex="1 0 0">
                    <ImageRatio src={gameImages[item.game] ?? ''} ratio={1} w={{ base: 6, md: 10 }} rounded={4} />
                    <Box>{item.game}</Box>
                  </FlexCenter>
                </Table.Cell>
                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5}>
                    {/* <ImageRatio src="/icons/coin-flip.png" ratio={1} w={6} rounded={999} /> */}
                    <Box>{formatAddress(item.username)}</Box>
                  </FlexCenter>
                </Table.Cell>

                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5}>
                    <Box>{dayjs(item.timestamp).format('hh:mm A')}</Box>
                  </FlexCenter>
                </Table.Cell>
                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5}>
                    <ChipsIcon />
                    <Box>
                      <Currency value={item.bet_amount} /> {SYMBOL_TOKEN}
                    </Box>
                  </FlexCenter>
                </Table.Cell>

                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5}>
                    <ChipsIcon />
                    <Box color={item.isWin ? 'green' : 'rgba(142, 142, 147, 1)'}>
                      <Currency value={item.reward} /> {SYMBOL_TOKEN}
                    </Box>
                  </FlexCenter>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </FlexCol>
  );
}
