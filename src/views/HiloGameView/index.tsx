'use client';

import { Box, chakra, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Absolute } from '@/components/Absolute';
import { Button } from '@/components/Button';
import { Currency } from '@/components/Currency';
import { FlexCenter, FlexCol } from '@/components/Flex';
import { ArrowGameUp, BackCard, CardIcon, ChipsIcon, ReloadIcon } from '@/components/Icons';
import { onChangeAmount } from '@/constants';
import { allCard } from '@/constants/card.constant';
import { SYMBOL_TOKEN } from '@/enums/token.enum';
import { useBaseQuery } from '@/hooks/useBaseQuery';
import { postHiloAction, postHiloNewGame } from '@/services/hilo';
import { updateUserInfo, useUser, useUserBalance } from '@/store/useUserStore';
import { toastError } from '@/utils/toast';

export default function HiloGameView() {
  const user = useUser();

  const [amount, setAmount] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState<{
    isWin: boolean;
    winAmount: number;
    betAmount: number;
  }>();
  const [resultCard, setResultCard] = useState<string>();

  const {
    data: dataNewGame,
    isFetching,
    error,
    refetch,
  } = useBaseQuery({
    queryKey: ['hilo-new-game'],
    queryFn: postHiloNewGame,
    enabled: !!user,
  });

  const [loading, setLoading] = useState(false);
  const userBalance = useUserBalance();
  const isNotEnoughBalance = useMemo(() => {
    return userBalance.lte(0) || userBalance.lt(Number(amount));
  }, [userBalance, amount]);

  const SystemCard = useMemo(() => (dataNewGame ? allCard[dataNewGame.bet_card] : BackCard), [dataNewGame]);

  const CardResult = useMemo(() => (resultCard ? allCard[resultCard] : BackCard), [resultCard]);
  const handlePlayGame = async (isHigh: boolean) => {
    try {
      setLoading(true);

      const result = await postHiloAction({
        bet: isHigh ? 'high or equal' : 'low or equal',
        bet_amount: Number(amount) * 10 ** 6,
      });

      const isWin = result.card.is_win;
      setResult({
        isWin,
        winAmount: result.card.reward,
        betAmount: result.card.bet_amount,
      });
      setResultCard(result.card.result_card);
      updateUserInfo(result.user);

      setTimeout(() => {
        setIsPlaying(false);
        setResult(undefined);

        // delay for animation
        setTimeout(() => {
          refetch();
        }, 500);
      }, 2_500);
    } catch (error) {
      toastError('Create new game failed!', error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box px={{ base: 0, md: 2.5 }} pb={{ base: 10, md: 10 }}>
      <FlexCol
        bg="bgGame"
        mt={5}
        rounded={10}
        pb={{ base: 2.5, md: 5 }}
        px={{ base: 2.5, md: 5 }}
        pt={{ base: 2.5, md: 173 }}
        align="center"
        color="white"
        lineHeight={1}
        flexDir={{ base: 'column-reverse', md: 'column' }}
      >
        <FlexCol align="center" w="full">
          <FlexCenter gap={{ base: 6, md: '58px' }} w="full" justify="center" align="center" pt={{ base: 10, md: 0 }}>
            <Box pos="relative">
              <BackCard w={{ base: '150px', md: '234px' }} visibility="hidden" />
              <motion.div
                className="absolute left-0 top-0 z-10 size-full"
                key={dataNewGame?.bet_card}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                initial={{ x: 292, y: -15, scale: 0.87 }}
                animate={{ x: 0, y: 0, scale: 1 }}
              >
                <motion.div
                  className="absolute left-0 top-0 size-full"
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
                >
                  <Absolute backfaceVisibility="hidden" transform="rotateY(0deg)">
                    <BackCard w="full" />
                  </Absolute>
                  <Absolute backfaceVisibility="hidden" transform="rotateY(180deg)">
                    <SystemCard w="full" />
                  </Absolute>
                </motion.div>
              </motion.div>
            </Box>

            <Box pt={2.5}>
              <Box pos="relative">
                <BackCard w={{ base: '150px', md: '234px' }} scale={0.87} />
                <Box pos="absolute" top={-2.5} left={0}>
                  <BackCard w={{ base: '150px', md: '234px' }} scale={0.87} />
                </Box>
                <Box pos="absolute" top={-5} left={0} scale={0.87}>
                  <BackCard w={{ base: '150px', md: '234px' }} visibility="hidden" />
                  <Absolute
                    transition="transform 0.6s"
                    transformStyle="preserve-3d"
                    perspective="1000px"
                    transform={`rotateY(${!result ? '180deg' : '0deg'})`}
                  >
                    <Absolute backfaceVisibility="hidden" transform="rotateY(0deg)">
                      <CardResult w="full" />
                      {result && (
                        <Absolute
                          rounded={12}
                          bg={result.isWin ? 'rgba(0, 227, 15, 0.2)' : 'rgba(255, 0, 0, 0.2)'}
                          border="3px solid"
                          borderColor={result.isWin ? 'rgba(0, 227, 15, 1)' : 'rgba(255, 0, 0, 1)'}
                        />
                      )}
                    </Absolute>
                    <Absolute backfaceVisibility="hidden" transform="rotateY(180deg)">
                      <BackCard w="full" />
                    </Absolute>
                  </Absolute>
                </Box>
              </Box>
            </Box>
          </FlexCenter>
          <Flex h={{ base: 100, md: '178px' }} w="full" justify="center">
            {result ? (
              <Box
                pt={{ base: 10, md: 14 }}
                color={result.isWin ? 'green' : 'red'}
                fontWeight={800}
                fontSize={{ base: 40, md: 50 }}
                textAlign="center"
                w="full"
              >
                {result.isWin ? 'WIN' : 'LOSE -'}{' '}
                <Currency value={result.isWin ? result.winAmount : result.betAmount} isWei /> {SYMBOL_TOKEN}!
              </Box>
            ) : !isPlaying ? (
              <Button
                h={10}
                px={'14px'}
                border="1px solid"
                borderColor="green"
                rounded={8}
                gap={2.5}
                mt={8}
                disabled={!dataNewGame || isFetching}
                onClick={() => refetch()}
              >
                <ReloadIcon />
                <CardIcon />
              </Button>
            ) : (
              <FlexCenter pt={{ base: 10, md: '57px' }} gap={10} fontSize={{ base: 14, md: 20 }} fontWeight={800}>
                <Button
                  bg="#1988F3"
                  w={{ base: 120, md: 190 }}
                  h={{ base: 12, md: 16 }}
                  rounded={8}
                  disabled={loading}
                  onClick={() => handlePlayGame(false)}
                >
                  <FlexCol align="center">
                    <ArrowGameUp w={{ base: 5, md: 8 }} transform="rotate(180deg)" />
                    <Box mt={-1.5}>Lower or same</Box>
                  </FlexCol>
                </Button>
                <Button
                  bg="#EC7B00"
                  w={{ base: 120, md: 190 }}
                  h={{ base: 12, md: 16 }}
                  rounded={8}
                  disabled={loading}
                  onClick={() => handlePlayGame(true)}
                >
                  <FlexCol align="center">
                    <ArrowGameUp w={{ base: 5, md: 8 }} />
                    <Box mt={-1.5}>Higher or same</Box>
                  </FlexCol>
                </Button>
              </FlexCenter>
            )}
          </Flex>
        </FlexCol>
        <Flex gap={{ base: 2.5, md: 5 }} w="full" flexDir={{ base: 'column', md: 'row' }}>
          <FlexCenter
            minW={{ base: 'full', md: 'fit-content', '2xl': 460 }}
            bg="bgMain"
            rounded={10}
            py={{ base: 5, md: 7 }}
            gap={2.5}
            justify="center"
            px={{ base: 2.5, md: 5 }}
          >
            <ChipsIcon w={{ base: '40px', md: '40px', xl: '50px', '2xl': '60px' }} />
            <FlexCol>
              <Box fontSize={{ base: 14, md: 16, xl: 20, '2xl': 24 }} color="dark" fontWeight={500}>
                BALANCE
              </Box>
              <Box fontSize={{ base: 30, md: 28, xl: 32, '2xl': 40 }} fontWeight={800}>
                <Currency value={user?.balance} isWei /> {SYMBOL_TOKEN}
              </Box>
            </FlexCol>
          </FlexCenter>
          <FlexCenter
            flex={1}
            justifyContent="center"
            bg="bgMain"
            rounded={10}
            px={{ base: 2.5, md: 5 }}
            py={3}
            fontSize={{ base: 20, md: 16, xl: 18, '2xl': 20 }}
            flexDir={{ base: 'column', md: 'row' }}
            align={{ base: 'start', md: 'center' }}
            gap={{ base: 5, md: 10 }}
          >
            <FlexCenter gap={{ base: 2, md: 3, xl: 4, '2xl': 5 }}>
              <Box fontWeight={800}>Bet Amount:</Box>

              <Box pos="relative" fontWeight={600} flex={1}>
                <Box pos="absolute" color="dark" top="50%" transform="translateY(-50%)" left={3}>
                  {SYMBOL_TOKEN}
                </Box>
                <chakra.input
                  disabled={isPlaying}
                  w="full"
                  minW="unset"
                  bg="rgba(8, 9, 12, 1)"
                  border="1px solid rgba(30, 33, 39, 1)"
                  value={amount}
                  rounded={10}
                  h={10}
                  lineHeight={1}
                  onChange={(e) => onChangeAmount(e, setAmount)}
                  inputMode="decimal"
                  pr={2}
                  pl={{ base: '80px', md: '70px', xl: '70px', '2xl': '80px' }}
                />
              </Box>
            </FlexCenter>
            <Button
              onClick={() => setIsPlaying(true)}
              disabled={
                isNotEnoughBalance ||
                !user ||
                loading ||
                !dataNewGame ||
                !!error ||
                isFetching ||
                !Number(amount) ||
                isPlaying
              }
              minW={142}
              w={{ base: 'full', md: 'fit-content' }}
              h={10}
              color="black"
              fontSize={20}
              fontWeight={800}
              bg="green"
              rounded={8}
            >
              Bet
            </Button>
          </FlexCenter>
        </Flex>
      </FlexCol>
    </Box>
  );
}
