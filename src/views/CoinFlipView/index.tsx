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
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  const handleCoinFlip = async () => {
    if (isAnimating) return;

    setIsAnimating(true);

    try {
      await controls.stop();
      await controls.set({ rotateY: 0 });

      await controls.start({
        rotateY: 360 * 3,
        transition: {
          duration: 2,
          ease: 'easeInOut',
        },
      });

      const result = Math.random() < 0.5;
      setIsFlipped(result);
    } catch (error) {
      console.error('Animation error:', error);
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <Box px={{ base: 0, md: 2.5 }}>
      <FlexCol
        bg="bgGame"
        mt={5}
        rounded={10}
        pb={{ base: 2.5, md: 5 }}
        px={{ base: 2.5, md: 5 }}
        pt={95}
        align="center"
        color="white"
        lineHeight={1}
      >
        <FlexCol align="center" w="full">
          <Flex gap={10} fontWeight={500} fontSize={{ base: 16, md: 30 }} pb="30px">
            <Box>
              Heads: <b>2</b>
            </Box>
            <Box>
              Tails: <b>6</b>
            </Box>
          </Flex>
          <FlexCenter gap="14px" pt="56px" pb={10}>
            <motion.div
              key={`coin-flip-${isFlipped}`}
              style={{
                perspective: '1000px',
                width: '200px',
                height: '200px',
                transformStyle: 'preserve-3d',
              }}
              animate={controls}
              onClick={handleCoinFlip}
            >
              <Box
                position="absolute"
                width="full"
                height="full"
                backgroundImage="url('/images/flip-tails.png')"
                backgroundSize="cover"
                backfaceVisibility="hidden"
                style={{
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
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
                  transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                  transformStyle: 'preserve-3d',
                }}
              />
            </motion.div>
          </FlexCenter>
          {/* <FlipHeadsIcon maxW="30%" /> */}
          {/* <FlipTailsIcon maxW="30%" /> */}
          <Box pt={4} pb={9}>
            <Box fontWeight={800} fontSize={50} color="green" h="50px">
              WIN: 100 $CHIP!
            </Box>
          </Box>
        </FlexCol>
        <Flex gap={5} w="full">
          <FlexCenter minW={460} bg="bgMain" rounded={10} py={7} gap={2.5} justify="center" px={2.5}>
            <ChipsIcon w="56px" />
            <FlexCol>
              <Box fontSize={24} color="dark" fontWeight={500}>
                BALANCE
              </Box>
              <Box fontSize={40} fontWeight={800}>
                12,356 $CHIP
              </Box>
            </FlexCol>
          </FlexCenter>
          <FlexCenter flex={1} gap={3} justifyContent="space-between" bg="bgMain" rounded={10} px={5}>
            <FlexCenter gap={5}>
              <Box fontSize={20} fontWeight={800}>
                Select side
              </Box>
              <FlipHeadsIcon maxW="60px" />
              <FlipTailsIcon maxW="60px" />
            </FlexCenter>
            <FlexCenter gap={5}>
              <Box fontSize={20} fontWeight={800}>
                Bet Amount:
              </Box>
              <Box pos="relative" fontSize={20} fontWeight={600}>
                <Box pos="absolute" color="dark" top={2.5} left={3}>
                  $CHIP
                </Box>
                <chakra.input
                  bg="rgba(8, 9, 12, 1)"
                  border="1px solid rgba(30, 33, 39, 1)"
                  value={amount}
                  rounded={10}
                  h={10}
                  onChange={(e) => onChangeAmount(e, setAmount)}
                  inputMode="decimal"
                  pr={2}
                  pl={74}
                />
              </Box>
            </FlexCenter>
            <Button px={57} h={10} color="black" fontSize={20} fontWeight={800} bg="green" rounded={8}>
              Bet
            </Button>
          </FlexCenter>
        </Flex>
      </FlexCol>
    </Box>
  );
}
