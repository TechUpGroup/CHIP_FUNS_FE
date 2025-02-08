'use client';

import { Box, chakra, Flex } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { FlexCenter, FlexCol } from '@/components/Flex';
import { ChipsIcon, FlipHeadsIcon, FlipTailsIcon } from '@/components/Icons';
import { onChangeAmount } from '@/constants';

export default function CoinFlipView() {
  const [amount, setAmount] = useState('');
  const [isTails, setIsTails] = useState(false);
  const [userSelectIsTails, setUserSelectIsTails] = useState<boolean>();
  const [result, setResult] = useState<{
    isTails: boolean;
    isWin: boolean;
    winAmount: number;
  }>();
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  const handleCoinFlip = async () => {
    if (isAnimating) return;

    // Validate bet amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      // Optional: Add error handling for invalid bet amount
      return;
    }

    setIsAnimating(true);

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

      // const result = await response.json();
      const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(2_000);
      const result = {
        isHeads: true,
        isWin: true,
        winAmount: 100,
      };

      // Stop the spinning animation
      await controls.stop();

      // Determine final rotation based on API result
      const finalRotation = result.isHeads ? 180 * 5 : 180 * 6;

      // Animate to final position
      await controls.start({
        rotateY: finalRotation,
        transition: {
          duration: 2,
          ease: 'easeOut',
        },
      });

      // Update UI based on API result
      setIsTails(result.isHeads);
      setResult({
        isTails: result.isHeads,
        isWin: result.isWin,
        winAmount: result.winAmount,
      });

      // Optional: Handle win/loss logic
      if (result.isWin) {
        // Show win notification or update balance
        console.log('You won!', result.winAmount);
      } else {
        // Show loss notification
        console.log('You lost!');
      }
    } catch (error) {
      console.error('Coin flip error:', error);
      // Optional: Show error to user
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <Box px={{ base: 0, md: 2.5 }} pb={{ base: '42px', md: '134px' }}>
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
              Heads: <b>2</b>
            </Box>
            <Box>
              Tails: <b>6</b>
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
                transform: isTails ? 'rotateY(180deg)' : 'rotateY(0deg)',
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
                transform: isTails ? 'rotateY(0deg)' : 'rotateY(180deg)',
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
                  {result.isWin ? 'WIN' : 'LOSE -'} {result.winAmount} $CHIP!
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
                12,356 $CHIP
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
                  $CHIP
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
                  pl={{ base: '70px', md: '60px', xl: '70px', '2xl': 74 }}
                />
              </Box>
            </FlexCenter>
            <Button
              px={57}
              h={10}
              color="black"
              fontSize={20}
              fontWeight={800}
              bg="green"
              rounded={8}
              onClick={handleCoinFlip}
              disabled={!Number(amount) || userSelectIsTails === undefined}
              w={{ base: 'full', md: 'fit-content' }}
              loading={isAnimating}
              loadingText="Flipping..."
            >
              <Box hideBelow="md">Bet</Box>
              <Box hideFrom="md">Flip the coin</Box>
            </Button>
          </FlexCenter>
        </Flex>
      </FlexCol>
    </Box>
  );
}
