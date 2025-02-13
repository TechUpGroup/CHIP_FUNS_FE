'use client';

import { Box, chakra, Flex } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ButtonWithAuth } from '@/components/Button';
import { Currency } from '@/components/Currency';
import { FlexCenter, FlexCol } from '@/components/Flex';
import { ChipsIcon, FlipHeadsIcon, FlipTailsIcon } from '@/components/Icons';
import { onChangeAmount } from '@/constants';
import { SYMBOL_TOKEN } from '@/enums/token.enum';
import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getFlipsHistory, postFlipsAction } from '@/services/flips';
import { updateUserInfo, useUser, useUserBalance } from '@/store/useUserStore';
import { playSound } from '@/utils/sounds';
import { toastError } from '@/utils/toast';

export default function CoinFlipView() {
  console.log('render CoinFlipView');
  const [amount, setAmount] = useState('');
  const [isTails, setIsTails] = useState(false);
  const [userSelectIsTails, setUserSelectIsTails] = useState<boolean>();
  const user = useUser();
  const { data, refetch } = useBaseQuery({
    queryKey: ['getFlipsHistory'],
    queryFn: getFlipsHistory,
    enabled: !!user,
  });
  const userBalance = useUserBalance();
  const [result, setResult] = useState<{
    isWin: boolean;
    winAmount: number;
    betAmount: number;
  }>();

  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  const handleCoinFlip = async () => {
    if (isAnimating) return;

    // Validate bet amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toastError('Invalid bet amount');
      return;
    }

    setIsAnimating(true);
    playSound('coinFlip');
    try {
      setResult(undefined);
      // Reset animation
      await controls.stop();
      await controls.set({ rotateY: 0 });

      // Start continuous spinning animation while waiting for API
      controls.start({
        rotateY: 360 * 10, // Continuous spinning
        transition: {
          duration: 5, // Adjust duration as needed
          repeat: Infinity,
          ease: 'linear',
        },
      });

      const result = await postFlipsAction({
        head_tail: userSelectIsTails ? 'TAILS' : 'HEADS',
        bet_amount: Number(amount) * 10 ** 6,
      });
      const isWin = result.flip.is_win;

      // Stop the spinning animation
      await controls.stop();
      await controls.set({ rotateY: 0 });
      const resIsTails = userSelectIsTails === isWin;
      // Determine final rotation based on API result
      const numberRotation = resIsTails !== isTails ? 5 : 6;
      const finalRotation = 180 * numberRotation;
      // Animate to final position
      await controls.start({
        rotateY: finalRotation,
        transition: {
          duration: 2,
          ease: 'easeOut',
        },
      });

      setIsTails(resIsTails);

      setResult({
        isWin: result.flip.is_win,
        winAmount: result.flip.reward,
        betAmount: result.flip.bet_amount,
      });
      updateUserInfo(result.user);
      refetch();
    } catch (error) {
      console.error('Coin flip error:', error);
      toastError('Coin flip failed', error);
    } finally {
      setIsAnimating(false);
    }
  };

  const isNotEnoughBalance = useMemo(() => {
    return userBalance.lte(0) || userBalance.lt(Number(amount));
  }, [userBalance, amount]);

  return (
    <Box px={{ base: 0, md: 2.5 }} pb={{ base: 10, md: 10 }}>
      <FlexCol
        bg="bgGame"
        mt={5}
        rounded={10}
        pb={{ base: 2.5, md: 5 }}
        px={{ base: 2.5, md: 5 }}
        pt={{ base: 2.5, md: 95 }}
        align="center"
        color="white"
        lineHeight={1}
        flexDir={{ base: 'column-reverse', md: 'column' }}
      >
        <FlexCol align="center" w="full">
          <Flex
            gap={10}
            fontWeight={500}
            fontSize={{ base: 20, md: 30 }}
            pb={{ base: 5, md: '30px' }}
            pt={{ base: 10, md: 0 }}
          >
            <Box>
              Heads:{' '}
              <b>
                <Currency value={data?.total_head} />
              </b>
            </Box>
            <Box>
              Tails:{' '}
              <b>
                <Currency value={data?.total_tail} />
              </b>
            </Box>
          </Flex>
          <motion.div
            key={`coin-flip-${isTails}`}
            style={{
              // perspective: '1000px',
              width: '314px',
              height: '314px',
              transformStyle: 'preserve-3d',
            }}
            animate={controls}
          >
            <Box
              position="absolute"
              width="full"
              height="full"
              backgroundImage="url('/images/flip-tails.png')"
              backgroundSize="cover"
              backfaceVisibility="hidden"
              style={{
                transform: isTails ? 'rotateY(0deg)' : 'rotateY(180deg)',
                transformStyle: 'preserve-3d',
              }}
            />
            <Box
              position="absolute"
              width="full"
              height="full"
              backgroundImage="url('/images/flip-heads.png')"
              backgroundSize="cover"
              backfaceVisibility="hidden"
              style={{
                transform: isTails ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
              }}
            />
          </motion.div>

          <Box pt={4} pb={9}>
            <Box
              fontWeight={800}
              fontSize={{ base: 40, md: 50 }}
              color="green"
              h={{ base: '40px', md: '50px' }}
              textAlign="center"
            >
              {!!result && (
                <Box color={result.isWin ? 'green' : 'red'}>
                  {result.isWin ? 'WIN' : 'LOSE -'}{' '}
                  <Currency value={result.isWin ? result.winAmount : result.betAmount} isWei /> {SYMBOL_TOKEN}!
                </Box>
              )}
            </Box>
          </Box>
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
            gap={3}
            justifyContent="space-between"
            bg="bgMain"
            rounded={10}
            px={{ base: 2.5, md: 5 }}
            py={5}
            fontSize={{ base: 20, md: 16, xl: 18, '2xl': 20 }}
            flexDir={{ base: 'column', md: 'row' }}
            align={{ base: 'start', md: 'center' }}
          >
            <FlexCenter gap={{ base: 2, md: 3, xl: 4, '2xl': 5 }}>
              <Box fontWeight={800}>Select side</Box>
              {[
                { Icon: FlipHeadsIcon, isTails: false },
                { Icon: FlipTailsIcon, isTails: true },
              ].map(({ Icon, isTails }, i) => {
                const isSelected = userSelectIsTails === isTails;
                return (
                  <Box
                    key={i}
                    onClick={() => setUserSelectIsTails(isTails)}
                    rounded={999}
                    border={isSelected ? '3px solid rgba(150, 240, 72, 1)' : undefined}
                    cursor="pointer"
                  >
                    <Icon w={{ base: '60px', md: '40px', xl: '50px', '2xl': '60px' }} />
                  </Box>
                );
              })}
            </FlexCenter>
            <FlexCenter gap={{ base: 2, md: 3, xl: 4, '2xl': 5 }}>
              <Box fontWeight={800}>Bet Amount:</Box>
              <Box pos="relative" fontWeight={600} flex={1}>
                <Box pos="absolute" color="dark" top="50%" transform="translateY(-50%)" left={3}>
                  {SYMBOL_TOKEN}
                </Box>
                <chakra.input
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
            <ButtonWithAuth
              h={10}
              color="black"
              fontSize={20}
              fontWeight={800}
              bg="green"
              rounded={8}
              onClick={handleCoinFlip}
              disabled={!user || isNotEnoughBalance || !Number(amount) || userSelectIsTails === undefined}
              w={{ base: 'full', md: '140px' }}
              loading={isAnimating}
              loadingText="Flipping..."
            >
              <Box hideBelow="md">Bet</Box>
              <Box hideFrom="md">Flip the coin</Box>
            </ButtonWithAuth>
          </FlexCenter>
        </Flex>
      </FlexCol>
    </Box>
  );
}
