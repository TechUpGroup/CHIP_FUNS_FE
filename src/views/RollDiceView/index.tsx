'use client';

import { Box, Center, chakra, Flex } from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';
import { Button } from '@/components/Button';
import { Currency } from '@/components/Currency';
import { FlexCenter, FlexCol } from '@/components/Flex';
import { ArrowUp, ChipsIcon, DotIcon } from '@/components/Icons';
import { onChangeAmount } from '@/constants';
import { SYMBOL_TOKEN } from '@/enums/token.enum';
import { postDiceAction } from '@/services/dice';
import { updateUserInfo, useUser, useUserBalance } from '@/store/useUserStore';
import { toastError } from '@/utils/toast';

export default function RollDiceView() {
  const user = useUser();
  const [amount, setAmount] = useState('');
  const userBalance = useUserBalance();
  const [userSelectOver, setUserSelectOver] = useState<boolean>();
  const [numberDot, setNumberDot] = useState(3);
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const intervalId = useRef<NodeJS.Timeout>(null);
  const [result, setResult] = useState<{
    isWin: boolean;
    winAmount: number;
    betAmount: number;
  }>();

  const isNotEnoughBalance = useMemo(() => {
    return userBalance.lte(0) || userBalance.lt(Number(amount));
  }, [userBalance, amount]);

  const rollDice = async () => {
    if (isRolling) return;

    // Validate bet amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toastError('Invalid bet amount');
      return;
    }
    let isStop = false;
    try {
      setIsRolling(true);
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }

      // let steps = 0;
      intervalId.current = setInterval(() => {
        if (isStop) {
          if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
          }
          return;
        }

        // Randomly change dice values during animation
        setDice1(Math.floor(Math.random() * 6) + 1);
        setDice2(Math.floor(Math.random() * 6) + 1);
      }, 50);

      const result = await postDiceAction({
        bet: userSelectOver ? 'high' : 'low',
        bet_amount: Number(amount) * 10 ** 6,
        bet_number: numberDot,
      });
      console.log(result.dice.result_dice);
      const isWin = result.dice.is_win;
      isStop = true;
      // Final dice values
      setDice1(result.dice.result_dice[0]);
      setDice2(result.dice.result_dice[1]);
      setResult({
        isWin,
        winAmount: result.dice.reward,
        betAmount: result.dice.bet_amount,
      });
      updateUserInfo(result.user);
    } catch (error) {
      console.error('Roll dice error:', error);
      toastError('Roll dice failed', error);
    } finally {
      setIsRolling(false);
      isStop = true;
    }
  };

  const renderDice = (value: number) => {
    const posPercent = '10%';
    const dicePositions = {
      1: [{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }],
      2: [
        { top: posPercent, left: posPercent },
        { bottom: posPercent, right: posPercent },
      ],
      3: [
        { top: posPercent, left: posPercent },
        { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        { bottom: posPercent, right: posPercent },
      ],
      4: [
        { top: posPercent, left: posPercent },
        { top: posPercent, right: posPercent },
        { bottom: posPercent, left: posPercent },
        { bottom: posPercent, right: posPercent },
      ],
      5: [
        { top: posPercent, left: posPercent },
        { top: posPercent, right: posPercent },
        { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        { bottom: posPercent, left: posPercent },
        { bottom: posPercent, right: posPercent },
      ],
      6: [
        { top: posPercent, left: posPercent },
        { top: posPercent, right: posPercent },
        { top: '50%', left: posPercent, transform: 'translateY(-50%)' },
        { top: '50%', right: posPercent, transform: 'translateY(-50%)' },
        { bottom: posPercent, left: posPercent },
        { bottom: posPercent, right: posPercent },
      ],
    };

    return (
      <Center
        bg="linear-gradient(158.2deg, #FFFFFF 7.95%, #D8D9D4 95.74%)"
        w={{ base: '150px', md: '212px' }}
        h={{ base: '150px', md: '212px' }}
        rounded={20}
        p="8.74px"
        position="relative"
        overflow="hidden"
      >
        <Center
          bg="linear-gradient(322.54deg, #FFFFFF 7.44%, #D8D9D4 76.61%)"
          w="full"
          h="full"
          rounded={999}
          position="relative"
        >
          {dicePositions[value as keyof typeof dicePositions]?.map((pos: any, index: number) => (
            <DotIcon key={index} pos="absolute" {...pos} />
          ))}
        </Center>
      </Center>
    );
  };

  return (
    <Box px={{ base: 0, md: 2.5 }} pb={{ base: 10 }}>
      <FlexCol
        bg="bgGame"
        mt={5}
        rounded={10}
        pb={{ base: 2.5, md: 5 }}
        px={{ base: 2.5, md: 5 }}
        pt={{ base: 2.5, md: 221 }}
        align="center"
        color="white"
        lineHeight={1}
        flexDir={{ base: 'column-reverse', md: 'column' }}
      >
        <FlexCol align="center" w="full">
          <Flex gap={{ base: 4, md: '118px' }} w="full" justify="center" pt={{ base: 10, md: 0 }}>
            {renderDice(dice1)}
            {renderDice(dice2)}
          </Flex>
          <Box
            pt={{ base: 5, md: '56px' }}
            pb={{ base: 10, md: '155px' }}
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
            py={3}
            fontSize={{ base: 20, md: 16, xl: 18, '2xl': 20 }}
            flexDir={{ base: 'column', md: 'row' }}
            align={{ base: 'start', md: 'center' }}
          >
            <FlexCenter
              gap={{ base: 2, md: 3, xl: 4, '2xl': 5 }}
              w={{ base: 'full', md: 'fit-content' }}
              justify="space-between"
            >
              <Box fontWeight={800}>Select</Box>
              <FlexCol gap={{ base: 2, md: 4 }}>
                {[
                  { name: 'Over', isOver: true },
                  { name: 'Under', isOver: false },
                ].map((e) => {
                  const isSelected = userSelectOver === e.isOver;
                  return (
                    <Button
                      key={e.name}
                      border="1px solid"
                      h={{ base: 8, md: 10 }}
                      rounded={8}
                      borderColor={isSelected ? 'green' : 'dark'}
                      color={isSelected ? 'green' : 'dark'}
                      w={{ base: '75px', md: '86px' }}
                      onClick={() => setUserSelectOver(e.isOver)}
                    >
                      {e.name}
                    </Button>
                  );
                })}
              </FlexCol>
              <Center
                bg="linear-gradient(158.2deg, #FFFFFF 7.95%, #D8D9D4 95.74%)"
                w={{ base: '80px', md: '96px' }}
                h={{ base: '80px', md: '96px' }}
                rounded={20}
                p="3.82px"
              >
                <Center bg="linear-gradient(322.54deg, #FFFFFF 7.44%, #D8D9D4 76.61%)" w="full" h="full" rounded={999}>
                  <Box fontSize={{ base: 50, md: 70 }} fontWeight={800} color="black" pb={2}>
                    {numberDot}
                  </Box>
                </Center>
              </Center>

              <FlexCol gap={{ base: 2, md: 4 }}>
                <Button
                  bg="rgba(8, 9, 12, 1)"
                  w={10}
                  h={10}
                  rounded={8}
                  disabled={numberDot === 11}
                  onClick={() => setNumberDot((s) => s + 1)}
                >
                  <ArrowUp />
                </Button>
                <Button
                  bg="rgba(8, 9, 12, 1)"
                  w={10}
                  h={10}
                  rounded={8}
                  onClick={() => setNumberDot((s) => s - 1)}
                  disabled={numberDot === 3}
                >
                  <ArrowUp transform="rotate(180deg)" />
                </Button>
              </FlexCol>
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
            <Button
              onClick={rollDice}
              disabled={isNotEnoughBalance || !user || isRolling || !Number(amount) || userSelectOver === undefined}
              minW={142}
              w={{ base: 'full', md: 'fit-content' }}
              h={10}
              color="black"
              fontSize={20}
              fontWeight={800}
              bg="green"
              rounded={8}
            >
              {isRolling ? 'Rolling...' : 'Roll'}
            </Button>
          </FlexCenter>
        </Flex>
      </FlexCol>
    </Box>
  );
}
