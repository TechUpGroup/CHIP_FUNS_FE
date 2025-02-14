'use client';

import { Box, Center, Flex, HStack, Table } from '@chakra-ui/react';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Currency } from '@/components/Currency';
import { FlexCenter, FlexCol } from '@/components/Flex';
import { ChipsIcon, ClaimIcon, InfoIcon } from '@/components/Icons';
import { Text16, Text20, Text32 } from '@/components/Text';
import { SYMBOL_TOKEN } from '@/enums/token.enum';
import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getPartnerList, IPartner, postClaimPartner } from '@/services/partners';
import { useUser } from '@/store/useUserStore';
import { formatAddress } from '@/utils/address';
import dayjs from '@/utils/dayjs';
import { scrollbarStyle } from '@/utils/styles/scrollbar';
import { toastError } from '@/utils/toast';

export default function ProfileView() {
  const user = useUser();
  const [loading, setLoading] = useState('');

  const { data, refetch } = useBaseQuery({
    queryKey: ['getPartnerList'],
    queryFn: getPartnerList,
    enabled: !!user,
    refetchInterval: 5_000,
  });

  const onClaim = async (partner: IPartner) => {
    if (loading) return;
    try {
      setLoading(partner.token);
      await postClaimPartner({ token: partner.token });
      refetch();
    } catch (error) {
      console.log(error);
      toastError('Claim failed', error);
    } finally {
      setLoading('');
    }
  };

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
                // { label: 'CLAIM TIME', minW: 240 },
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
            {data?.map((item, i) => (
              <Table.Row key={i} bg="unset">
                <Table.Cell px={5} pb={6} pt={0}>
                  <FlexCenter gap={1.5}>
                    <ChipsIcon />
                    <Box>
                      <Currency value={item.reward} isWei /> {SYMBOL_TOKEN}
                    </Box>
                  </FlexCenter>
                </Table.Cell>
                <Table.Cell px={5} pb={6} pt={0}>
                  <Box gap={1.5}>{formatAddress(item.token)}</Box>
                </Table.Cell>
                {/* <Table.Cell px={5} pb={6} pt={0}>
                  <Box>{dayjs(item.timestamp).format('hh:mm A, DD/MM/YYYY')}</Box>
                </Table.Cell> */}
                <Table.Cell px={5} pb={6} pt={0}>
                  {!item.claimed && (
                    <Button
                      h={10}
                      px={'27px'}
                      rounded={10}
                      bg="#96F048"
                      color="black"
                      onClick={() => onClaim(item)}
                      loading={loading === item.token}
                      disabled={!!loading}
                    >
                      <Flex gap={2.5} align="center">
                        <Text16 fontWeight={600}>CLAIM</Text16>
                      </Flex>
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </FlexCol>
  );
}
