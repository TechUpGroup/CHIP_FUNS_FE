'use client';

import { AspectRatio, Box, Flex, SimpleGrid, Table } from '@chakra-ui/react';
import { Button } from '@/components/Button';
import { FlexCenter, FlexCol } from '@/components/Flex';
import { ArrowLink, BannerRight, ChipsIcon, GameIcon, LogoCoinFlip, TransactionIcon } from '@/components/Icons';
import { ImageRatio } from '@/components/Image';
import { LinkCustom } from '@/components/LinkCustom';
import { scrollbarStyle } from '@/utils/styles/scrollbar';

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
];
export default function HomeView() {
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
        {Array.from({ length: 12 }).map((_, index) => (
          <LinkCustom href="/coin-flip" key={index}>
            <AspectRatio ratio={1} w="full">
              <Box
                rounded={20}
                bgImage="url('/icons/coin-flip.png')"
                bgSize="cover"
                bgPos="center"
                bgRepeat="no-repeat"
              >
                <Flex
                  align="end"
                  justify="center"
                  rounded={20}
                  bgImage="url('/icons/coin-flip.png')"
                  bgSize="cover"
                  bgPos="center"
                  bgRepeat="no-repeat"
                  w="full"
                  h="full"
                >
                  <Box
                    fontSize={{ base: 14, lg: 16, xl: 18, '2xl': 20 }}
                    fontWeight={800}
                    lineHeight={1}
                    pb={{ base: 2, md: 3 }}
                    textAlign="center"
                    color="white"
                  >
                    Coin Flip Game
                  </Box>
                </Flex>
              </Box>
            </AspectRatio>
          </LinkCustom>
        ))}
      </SimpleGrid>
      <FlexCenter gap="14px" pt={{ base: 10, md: '96px' }} pb={{ base: 5, md: 6 }}>
        <TransactionIcon w={{ base: 6, md: 8 }} />
        <Box fontSize={{ base: 24, md: 32 }} fontWeight={700} color="white">
          ALL TRANSACTIONS
        </Box>
      </FlexCenter>

      <Box w="full" overflowX="auto" css={scrollbarStyle} bg="bgGame" color="white" rounded={10}>
        <Table.Root size="sm">
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
            {items.map((item) => (
              <Table.Row key={item.id} bg="unset">
                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5} flex="1 0 0">
                    <AspectRatio ratio={1} w={{ base: 6, md: 10 }}>
                      <Box
                        rounded={4}
                        bgImage="url('/icons/coin-flip.png')"
                        bgSize="cover"
                        bgPos="center"
                        bgRepeat="no-repeat"
                      />
                    </AspectRatio>
                    <Box>Coin Flip Game</Box>
                  </FlexCenter>
                </Table.Cell>
                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5}>
                    <ImageRatio src="/icons/coin-flip.png" ratio={1} w={6} rounded={999} />
                    <Box>Savannah Nguyen</Box>
                  </FlexCenter>
                </Table.Cell>
                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5}>
                    <Box>14:45 PM</Box>
                  </FlexCenter>
                </Table.Cell>
                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5}>
                    <ChipsIcon />
                    <Box>30.00 $CHIP</Box>
                  </FlexCenter>
                </Table.Cell>
                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5}>
                    <ChipsIcon />
                    <Box color="green">30.00 $CHIP</Box>
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
