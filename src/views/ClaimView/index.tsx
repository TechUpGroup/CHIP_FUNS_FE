'use client';

import { Box, Center, createListCollection, Flex, HStack, SimpleGrid, Table } from '@chakra-ui/react';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Currency } from '@/components/Currency';
import { FlexBetween, FlexCenter, FlexCol } from '@/components/Flex';
import {
  ChipsIcon,
  ClaimIcon,
  DepositIcon,
  HistoryIcon,
  InfoIcon,
  ProfileIcon,
  ReloadIcon,
  WithdrawIcon,
} from '@/components/Icons';
import { ImageRatio } from '@/components/Image';
import { Text16, Text20, Text24, Text32 } from '@/components/Text';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { SYMBOL_TOKEN } from '@/enums/token.enum';
import useAuth from '@/hooks/useAuth';
import { useBaseQuery } from '@/hooks/useBaseQuery';
import useWalletActive from '@/hooks/useWalletActive';
import { getHistoryAction } from '@/services/histories';
import { formatAddress } from '@/utils/address';
import dayjs from '@/utils/dayjs';
import { scrollbarStyle } from '@/utils/styles/scrollbar';

const historyOpts = createListCollection({
  items: [
    { label: 'All', value: 'all' },
    { label: 'Deposit', value: 'deposited' },
    { label: 'Withdraw', value: 'withdrawn' },
  ],
});

const statusOpts = createListCollection({
  items: [
    { label: 'All Status', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Failed', value: 'failed' },
  ],
});

export default function ProfileView() {
  const { logout } = useAuth();
  const { address } = useWalletActive();
  const [type, setType] = useState<string[]>(['all']);
  const [status, setStatus] = useState<string[]>(['all']);
  const [page, setPage] = useState(1);

  const { data } = useBaseQuery({
    queryKey: ['histories', page, type, status],
    queryFn: () =>
      getHistoryAction({
        page,
        limit: 10,
        tx_type: type[0] === 'all' ? undefined : (type[0] as any),
        tx_status: status[0] as any,
      }),
    enabled: !!address,
    refetchInterval: 5_000,
  });

  return (
    <FlexCol color="white" w="full" pt={9}>
      <FlexCenter justify="space-between" gap={2.5} flexDir={{ base: 'column', md: 'row' }}>
        <FlexCenter gap={2.5}>
          <ClaimIcon />
          <Text32 fontWeight={700}>CLAIM</Text32>
        </FlexCenter>
        <FlexCenter gap={2.5} py={3} px={5} bg="#1E2127" rounded={10}>
          <InfoIcon />
          <Text20 color="#8E8E93" fontWeight={700}>
            The amount of {SYMBOL_TOKEN} claimed is equivalent to the token balance you are holding
          </Text20>
        </FlexCenter>
      </FlexCenter>
      <Box w="full" overflow="auto" maxH="500px" css={scrollbarStyle} bg="bgGame" color="white" rounded={10} mt={5}>
        <Table.Root size="sm" unstyled w="full">
          <Table.Header>
            <Table.Row bg="unset">
              {[
                { label: 'AMOUNT', minW: 200 },
                { label: 'TRANSACTION', minW: 180 },
                { label: 'CLAIM TIME', minW: 240 },
                { label: 'ACTION', minW: 180 },
              ].map((e, i) => (
                <Table.ColumnHeader
                  key={i}
                  fontSize={{ base: 14, md: 18 }}
                  lineHeight={1.4}
                  p={5}
                  fontWeight={700}
                  color="dark"
                  minW={e.minW ?? 180}
                  textAlign="start"
                >
                  {e.label}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body fontSize={{ base: 12, md: 20 }} lineHeight={1} fontWeight={800}>
            {data?.docs.map((item, i) => (
              <Table.Row key={i} bg="unset">
                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5}>
                    <ChipsIcon />
                    <Box>
                      <Currency value={item.amount} isWei /> {SYMBOL_TOKEN}
                    </Box>
                  </FlexCenter>
                </Table.Cell>
                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5}>
                    <Box>{item.event === 'deposited' ? 'Deposit' : 'Withdraw'}</Box>
                  </FlexCenter>
                </Table.Cell>
                <Table.Cell px={5} pb={6} pt={0}>
                  <Box>{dayjs(item.timestamp).format('hh:mm A, DD/MM/YYYY')}</Box>
                </Table.Cell>
                <Table.Cell px={5} pb={6} pt={0}>
                  <Button h={10} px={'27px'} rounded={10} bg="#96F048" color="black">
                    <Flex gap={2.5} align="center">
                      <Text16 fontWeight={600}>CLAIM</Text16>
                    </Flex>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      <Center py={3} mt={2.5}>
        <PaginationRoot
          count={data?.totalDocs ?? 0}
          pageSize={data?.limit}
          defaultPage={1}
          onPageChange={(e) => setPage(e.page)}
          color="white"
          size="xs"
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Center>
    </FlexCol>
  );
}
