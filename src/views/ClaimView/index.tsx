'use client';

import { Box, Flex, Table } from '@chakra-ui/react';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Currency } from '@/components/Currency';
import { FlexCenter, FlexCol } from '@/components/Flex';
import { ChipsIcon, ClaimIcon, InfoIcon } from '@/components/Icons';
import { ImageRatio } from '@/components/Image';
import { Text16, Text32 } from '@/components/Text';
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
  Tooltip,
} from '@/components/ui';
import { SYMBOL_TOKEN } from '@/enums/token.enum';
import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getPartnerList, IPartner, postClaimPartner } from '@/services/partners';
import { useUser } from '@/store/useUserStore';
import { formatAddress } from '@/utils/address';
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
    <FlexCol color="white" w="full" pt={{ base: 5, md: 9 }}>
      <FlexCenter justify="space-between" gap={2.5} flexDir={{ base: 'column', md: 'row' }}>
        <FlexCenter gap={2.5}>
          <ClaimIcon />
          <Text32 fontWeight={700}>CLAIM</Text32>
        </FlexCenter>
        <FlexCol align={{ base: 'center', md: 'end' }} gap={2.5}>
          <Box hideBelow="md">
            <Tooltip content={`Claim your weekly free CHIPS by holding our partner's tokens`}>
              <InfoIcon />
            </Tooltip>
          </Box>
          <Box hideFrom="md">
            <PopoverRoot>
              <PopoverTrigger asChild>
                <Button>
                  <InfoIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  <PopoverTitle fontWeight="medium">{`Claim your weekly free CHIPS by holding our partner's tokens`}</PopoverTitle>
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          </Box>
          <Flex gap={2.5}>
            {['partner-1', 'partner-2', 'partner-3', 'partner-4', 'partner-5'].map((item, i) => (
              <ImageRatio key={i} src={`/icons/${item}.png`} ratio={1} w={{ base: 10, md: '60px' }} />
            ))}
          </Flex>
        </FlexCol>
      </FlexCenter>
      <Box w="full" overflow="auto" h="500px" css={scrollbarStyle} bg="bgGame" color="white" rounded={10} mt={5}>
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
                  {item.status && (
                    <Button
                      h={{ base: 8, md: 10 }}
                      px={'27px'}
                      rounded={10}
                      bg={item.claimed ? 'dark' : '#96F048'}
                      color="black"
                      onClick={() => onClaim(item)}
                      loading={loading === item.token}
                      disabled={!!loading || item.claimed}
                    >
                      <Flex gap={2.5} align="center">
                        <Text16 fontWeight={600} fontSize={{ base: 14, md: 16 }}>
                          {item.claimed ? 'CLAIMED' : 'CLAIM'}
                        </Text16>
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
