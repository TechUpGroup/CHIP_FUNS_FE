'use client';

import { Box, Flex, Table } from '@chakra-ui/react';
import { useState } from 'react';
import { Absolute } from '@/components/Absolute';
import { Button } from '@/components/Button';
import { Currency } from '@/components/Currency';
import { FlexBetween, FlexCenter, FlexCol } from '@/components/Flex';
import { ChipsIcon, ClaimIcon, InfoIcon } from '@/components/Icons';
import { ImageRatio } from '@/components/Image';
import { Text16, Text20, Text32 } from '@/components/Text';
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
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { getPartnerList, IPartner, postClaimPartner } from '@/services/partners';
import { useUser } from '@/store/useUserStore';
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

  const currentTime = useCurrentTime();

  return (
    <FlexCol color="white" w="full" pt={{ base: 5, md: 9 }}>
      <FlexCenter justify="space-between" gap={2.5} flexDir={{ base: 'column', md: 'row' }}>
        <FlexCenter gap={2.5}>
          <ClaimIcon />
          <Text32 fontWeight={700}>CLAIM</Text32>
        </FlexCenter>

        <FlexCol align={{ base: 'center', md: 'end' }} gap={2.5}>
          <FlexCenter gap={2.5} py={3} px={5} bg="#1E2127" rounded={10}>
            <Text20 color="#8E8E93" fontWeight={700} fontSize={{ base: 16, md: 20 }}>
              Claim your weekly free {SYMBOL_TOKEN} by holding our partner{`'`}s tokens.
            </Text20>
            <Box hideBelow="md">
              <Tooltip content={`Your weekly claim amount is equal to your token holding balance.`}>
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
                    <PopoverTitle fontWeight="medium">{`Your weekly claim amount is equal to your token holding balance.`}</PopoverTitle>
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            </Box>
          </FlexCenter>
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
                { label: 'HOLD TOKEN AMOUNT', minW: 200 },
                { label: 'HOLD AT / CLAIM AT', minW: 580 },
                { label: 'BALANCE', minW: 200 },
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
            {data?.map((item, i) => {
              let progess = 0;
              if (item.holdAt) {
                const diff = currentTime - item.holdAt;
                if (diff > 0) {
                  progess = (diff / (2 * 86_400)) * 100;
                }
              }
              return (
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
                    <FlexCenter gap={2.5}>
                      <ImageRatio src={item.image} ratio={1} w={10} rounded="full" />
                      <Box textTransform="uppercase">
                        <Currency value={30} suffix={` $${item.name}`} />
                      </Box>
                    </FlexCenter>
                  </Table.Cell>
                  <Table.Cell px={5} pb={6} pt={0}>
                    <FlexCol gap="5px">
                      <Box pos="relative" h={2} w="full" bg="white" rounded="full">
                        <Absolute w={`${progess}%`} rounded="full" bg={true ? '#FF7E00' : '#96F048'} />
                      </Box>
                      <FlexBetween gap={2} fontSize={{ base: 12, md: 16 }} fontWeight={700}>
                        <Box>{!!item.holdAt && dayjs(item.holdAt * 1000).format('HH:mm DD/MM/YYYY')}</Box>
                        <Box>{!!item.claimedAt && dayjs(item.claimedAt * 1000).format('HH:mm DD/MM/YYYY')}</Box>
                      </FlexBetween>
                    </FlexCol>
                  </Table.Cell>
                  <Table.Cell px={5} pb={6} pt={0}>
                    <FlexCenter gap={1.5}>
                      <ChipsIcon />
                      <Box>
                        <Currency value={item.balance} isWei /> {SYMBOL_TOKEN}
                      </Box>
                    </FlexCenter>
                  </Table.Cell>
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
              );
            })}
          </Table.Body>
        </Table.Root>
      </Box>
    </FlexCol>
  );
}
