import { Box, chakra, useDisclosure } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';
import { Button, ButtonWithAuth } from '@/components/Button';
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
import { onChangeAmount } from '@/constants';
import { SYMBOL_TOKEN } from '@/enums/token.enum';
import { useSignRawTransaction } from '@/hooks/solana/useSignRawTransaction';
import useWalletAddress from '@/hooks/useWalletAddress';
import { postUsersWithdraw } from '@/services/user';
import { useUser } from '@/store/useUserStore';
import { toastError, toastSuccess } from '@/utils/toast';

export const WithdrawDialog = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const signRawTransaction = useSignRawTransaction();
  const { open, onOpen, onClose, setOpen } = useDisclosure();
  const user = useUser();
  const { address: walletAddress } = useWalletAddress();

  useEffect(() => {
    if (walletAddress) {
      setAddress(walletAddress);
    }
  }, [walletAddress]);

  const onWithdraw = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const rawTxs = await postUsersWithdraw({ address, amount: Number(amount) });
      await signRawTransaction(rawTxs);
      setAddress('');
      setAmount('');
      onClose();
      toastSuccess('Withdraw success');
    } catch (error) {
      console.log(error);
      toastError('Withdraw failed', error);
    } finally {
      setLoading(false);
    }
  };

  const balanceFormat = useMemo(() => BigNumber(user?.balance ?? 0).dividedBy(Math.pow(10, 6)), [user]);

  const isNotEnoughBalance = useMemo(() => {
    return balanceFormat.lte(0) || balanceFormat.lt(Number(amount));
  }, [balanceFormat, amount]);

  return (
    <>
      <Button
        h={{ base: 6, md: 10 }}
        border="1px solid"
        borderColor="green"
        color="green"
        rounded={8}
        px={{ base: 2, md: 13 }}
        fontSize={{ base: 12, md: 16 }}
        fontWeight={600}
        onClick={onOpen}
      >
        Withdraw
      </Button>
      <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)} lazyMount>
        <DialogContent bg="bgGame" color="white" rounded={10} lineHeight={1.4}>
          <DialogHeader p={4} pb={0}>
            <DialogTitle fontSize={20} fontWeight={800} textAlign="center">
              Withdraw
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
                  placeholder="Enter public address"
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
                    pl={'60px'}
                  />
                </Box>
                <Box fontSize={14} color="rgba(174, 174, 178, 1)">
                  (Balance: <Currency value={user?.balance} isWei /> {SYMBOL_TOKEN})
                </Box>
              </FlexCol>
            </FlexCol>
          </DialogBody>
          <DialogFooter px={5} py={4} pt={0}>
            <ButtonWithAuth
              bg="green"
              fontSize={16}
              fontWeight={600}
              h={10}
              rounded={8}
              w="full"
              color="black"
              onClick={onWithdraw}
              loading={loading}
              disabled={!address || !Number(amount) || isNotEnoughBalance}
            >
              Send
            </ButtonWithAuth>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};
