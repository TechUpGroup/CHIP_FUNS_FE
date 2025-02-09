import { Box } from '@chakra-ui/react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/Button';
import { FlexCenter, FlexCol } from '@/components/Flex';
import {
  ClipboardIconButton,
  ClipboardRoot,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';

export const DepositDialog = () => {
  return (
    <DialogRoot role="alertdialog">
      <DialogTrigger asChild>
        <Button h={{ base: 6, md: 10 }} bg="green" rounded={8} px={{ base: 2, md: 13 }} fontWeight={600}>
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent bg="bgGame" color="white" rounded={10} lineHeight={1.4}>
        <DialogHeader p={4} pb={0}>
          <DialogTitle fontSize={20} fontWeight={800} textAlign="center">
            Deposit
          </DialogTitle>
        </DialogHeader>
        <DialogBody px={4} py={5}>
          <FlexCol align="center" gap={5} w="full">
            <Box rounded={5} p={1.5} bg="white">
              <QRCode value="hey" size={185} />
            </Box>
            <FlexCenter
              px={5}
              h={{ base: 'fit-content', md: '56px' }}
              justify="space-between"
              bg="rgba(49, 73, 64, 1)"
              rounded={16}
              w="full"
              gap={2}
              flexDir={{ base: 'column', md: 'row' }}
              py={1.5}
            >
              <Box fontWeight={700} fontSize={16}>
                0xec7842178520bb71f30523bcce4c10adc7e1cec4
              </Box>
              <ClipboardRoot value="https://chakra-ui.com">
                <ClipboardIconButton />
              </ClipboardRoot>
            </FlexCenter>
          </FlexCol>
        </DialogBody>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
