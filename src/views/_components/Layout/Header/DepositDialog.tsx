import { Box, chakra, useDisclosure } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/Button';
import { Currency } from '@/components/Currency';
import { FlexCol } from '@/components/Flex';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui';
import { env } from '@/config';
import { onChangeAmount } from '@/constants';
import { SYMBOL_TOKEN } from '@/enums/token.enum';
import { useSolanaBalanceToken } from '@/hooks/solana';
import { useSignRawTransaction } from '@/hooks/solana/useSignRawTransaction';
import { postUsersDeposit } from '@/services/user';
import { toastError, toastSuccess } from '@/utils/toast';

export const DepositDialog = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const signRawTransaction = useSignRawTransaction();
  const { balance } = useSolanaBalanceToken(env.address.token);
  const { open, onOpen, onClose, setOpen } = useDisclosure();

  const onDeposit = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const rawTxs = await postUsersDeposit({ address, amount: Number(amount) });
      await signRawTransaction(rawTxs);
      setAddress('');
      setAmount('');
      onClose();
      toastSuccess('Deposit success');
    } catch (error) {
      console.log(error);
      toastError('Deposit failed', error);
    } finally {
      setLoading(false);
    }
  };

  const isNotEnoughBalance = useMemo(() => {
    return !balance?.uiAmount || balance.uiAmount < Number(amount);
  }, [balance, amount]);

  return (
    <>
      <Button h={{ base: 6, md: 10 }} bg="green" rounded={8} px={{ base: 2, md: 13 }} fontWeight={600} onClick={onOpen}>
        Deposit
      </Button>
      <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)} lazyMount>
        <DialogContent bg="bgGame" color="white" rounded={10} lineHeight={1.4}>
          <DialogHeader p={4} pb={0}>
            <DialogTitle fontSize={20} fontWeight={800} textAlign="center">
              Deposit
            </DialogTitle>
          </DialogHeader>
          <DialogBody px={4} py={5}>
            <FlexCol gap={5}>
              <FlexCol gap={2.5}>
                <Box fontSize={18} fontWeight={800}>
                  Address
                </Box>
                <chakra.input
                  h={10}
                  px={4}
                  bg="white"
                  color="black"
                  rounded={10}
                  placeholder="Enter public address (0x)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FlexCol>
              <FlexCol gap={2.5}>
                <Box fontSize={18} fontWeight={800}>
                  Amount
                </Box>
                <Box pos="relative" fontWeight={600} flex={1}>
                  <Box pos="absolute" color="dark" top="50%" transform="translateY(-50%)" left={3}>
                    {SYMBOL_TOKEN}
                  </Box>
                  <chakra.input
                    w="full"
                    minW="unset"
                    bg="white"
                    color="black"
                    border="1px solid rgba(30, 33, 39, 1)"
                    value={amount}
                    rounded={10}
                    h={10}
                    lineHeight={1}
                    onChange={(e) => onChangeAmount(e, setAmount)}
                    inputMode="decimal"
                    pr={2}
                    pl={'52px'}
                  />
                </Box>
                <Box fontSize={14} color="rgba(174, 174, 178, 1)">
                  (Balance: <Currency value={balance?.amount} isWei /> {SYMBOL_TOKEN})
                </Box>
              </FlexCol>
            </FlexCol>
          </DialogBody>
          <DialogFooter px={5} py={4} pt={0}>
            <Button
              bg="green"
              fontSize={16}
              fontWeight={600}
              h={10}
              rounded={8}
              w="full"
              color="black"
              onClick={onDeposit}
              loading={loading}
              disabled={!address || !Number(amount) || isNotEnoughBalance}
            >
              Send
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};
