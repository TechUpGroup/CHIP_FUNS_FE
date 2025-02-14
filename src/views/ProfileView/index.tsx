'use client';

import { Box, Center, createListCollection, Flex, HStack, SimpleGrid, Table } from '@chakra-ui/react';
import { isNil } from 'lodash';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Currency } from '@/components/Currency';
import { FlexBetween, FlexCenter, FlexCol } from '@/components/Flex';
import { ChipsIcon, DepositIcon, HistoryIcon, ProfileIcon, ReloadIcon, WithdrawIcon } from '@/components/Icons';
import { ImageRatio } from '@/components/Image';
import { Text16, Text24, Text32 } from '@/components/Text';
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
import { useSignRawTransaction } from '@/hooks/solana/useSignRawTransaction';
import useAuth from '@/hooks/useAuth';
import { useBaseQuery } from '@/hooks/useBaseQuery';
import useWalletActive from '@/hooks/useWalletActive';
import { getHistoryAction, IHistory } from '@/services/histories';
import { formatAddress } from '@/utils/address';
import dayjs from '@/utils/dayjs';
import { scrollbarStyle } from '@/utils/styles/scrollbar';
import { toastSuccess } from '@/utils/toast';
import { toastError } from '@/utils/toast';

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
  const signRawTransaction = useSignRawTransaction();
  const [loading, setLoading] = useState<number | undefined>(undefined);
  const onRetry = async (his: IHistory, index: number) => {
    if (!isNil(loading)) return;
    try {
      setLoading(index);
      await signRawTransaction(his.signature);
      toastSuccess('Retry success');
    } catch (error) {
      console.log(error);
      toastError('Retry failed', error);
    } finally {
      setLoading(undefined);
    }
  };

  const [type, setType] = useState<string[]>(['all']);
  const [status, setStatus] = useState<string[]>(['all']);
  const [page, setPage] = useState(1);

  const { data } = useBaseQuery({
    queryKey: ['getHistoryAction', page, type, status],
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
    <FlexCol color="white" w="full" pt={30}>
      <FlexCenter gap={2.5}>
        <ProfileIcon />
        <Text32 fontWeight={700}>PROFILE</Text32>
      </FlexCenter>
      <Flex gap="18px" flexDir={{ base: 'column', md: 'row' }} pt={5}>
        <FlexCol py={6} px={2} align="center" bg="#1E2127" rounded={10} w="24%">
          <ImageRatio src="/icons/avatar.png" ratio={1} w={162} rounded="full" />
          <Text24 fontWeight={700} fontSize={26} pt={2}>
            {address ? formatAddress(address) : 'Not connected'}
          </Text24>
          <SimpleGrid columns={2} gap={5} pt={5} w="full">
            <Button bg="#2BA2DE" rounded={10} h="42px" disabled>
              <Text16 fontWeight={700} fontKaran>
                CONNECT TELEGRAM
              </Text16>
            </Button>
            <Button bg="#201B03" border="1px solid white" rounded={10} h="42px" disabled>
              <Text16 fontWeight={700} fontKaran>
                CONNECT X
              </Text16>
            </Button>
          </SimpleGrid>
          {!!address && (
            <Button bg="#FF4A4A" rounded={10} h="42px" w="full" onClick={logout} mt={5}>
              <Text16 fontWeight={700} fontKaran>
                DISCONNECT
              </Text16>
            </Button>
          )}
          <Flex gap={2.5} py={3} px={5} bg="#15181D" rounded={10} w="full" mt={5}>
            <HistoryIcon />
            <Text16 fontWeight={700}>History</Text16>
          </Flex>
        </FlexCol>
        <FlexCol flex={1} overflow="hidden">
          <FlexBetween w="full">
            <SelectRoot collection={historyOpts} w={143} value={type} onValueChange={(e) => setType(e.value)}>
              <SelectLabel />
              <SelectTrigger>
                <SelectValueText />
              </SelectTrigger>
              <SelectContent>
                {historyOpts.items.map((movie) => (
                  <SelectItem item={movie} key={movie.value}>
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Flex gap={5}>
              <SelectRoot collection={statusOpts} minW={143} value={status} onValueChange={(e) => setStatus(e.value)}>
                <SelectLabel />
                <SelectTrigger>
                  <SelectValueText />
                </SelectTrigger>
                <SelectContent>
                  {statusOpts.items.map((movie) => (
                    <SelectItem item={movie} key={movie.value}>
                      {movie.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
              {/* <SelectRoot collection={historyOpts} minW={143} value={type} onValueChange={(e) => setType(e.value)}>
                <SelectLabel />
                <SelectTrigger>
                  <SelectValueText />
                </SelectTrigger>
                <SelectContent>
                  {historyOpts.items.map((movie) => (
                    <SelectItem item={movie} key={movie.value}>
                      {movie.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot> */}
            </Flex>
          </FlexBetween>
          <Box w="full" overflow="auto" maxH="500px" css={scrollbarStyle} bg="bgGame" color="white" rounded={10} mt={5}>
            <Table.Root size="sm" unstyled w="full">
              <Table.Header>
                <Table.Row bg="unset">
                  {[
                    { label: 'TRANSACTION', minW: 180 },
                    { label: 'AMOUNT', minW: 200 },
                    { label: 'TIME', minW: 240 },
                    { label: 'STATUS', minW: 180 },
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
                        {item.event === 'deposited' ? <DepositIcon /> : <WithdrawIcon />}
                        <Box>{item.event === 'deposited' ? 'Deposit' : 'Withdraw'}</Box>
                      </FlexCenter>
                    </Table.Cell>
                    <Table.Cell px={5} pb={6} pt={0}>
                      <FlexCenter gap={1.5}>
                        <ChipsIcon />
                        <Box>
                          <Currency value={item.amount} isWei /> {SYMBOL_TOKEN}
                        </Box>
                      </FlexCenter>
                    </Table.Cell>
                    <Table.Cell px={5} pb={6} pt={0}>
                      <Box>{dayjs(item.timestamp).format('hh:mm A, DD/MM/YYYY')}</Box>
                    </Table.Cell>
                    <Table.Cell px={5} pb={6} pt={0}>
                      <Box
                        w="89px"
                        fontSize={16}
                        py={2.5}
                        textAlign="center"
                        rounded={10}
                        lineHeight={1.25}
                        color={item.status === 'completed' ? '#96F048' : '#FF4A4A'}
                        bg={item.status === 'completed' ? 'rgba(150, 240, 72, 0.2)' : 'rgba(255, 74, 74, 0.2)'}
                      >
                        {item.status === 'completed' ? 'Completed' : 'Failed'}
                      </Box>
                    </Table.Cell>
                    <Table.Cell px={5} pb={6} pt={0}>
                      {item.status === 'failed' && (
                        <Button
                          h={10}
                          px={2.5}
                          rounded={10}
                          bg="#96F048"
                          color="black"
                          disabled={!isNil(loading)}
                          loading={loading === i}
                          onClick={() => onRetry(item, i)}
                        >
                          <Flex gap={2.5} align="center">
                            <ReloadIcon w={4} fill="currentcolor" />
                            <Text16 fontWeight={600}>Retry</Text16>
                          </Flex>
                        </Button>
                      )}
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
      </Flex>
    </FlexCol>
  );
}
