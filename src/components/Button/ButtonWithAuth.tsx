'use client';

import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { forwardRef } from 'react';
import { useSignMessage } from '@/hooks/useSignMessage';
import { useUser } from '@/store/useUserStore';
import { Button, ButtonBaseProps } from './ButtonBase';

export const ButtonWithAuth = forwardRef<HTMLButtonElement, ButtonBaseProps>(function Component(
  { children, ...props },
  ref,
) {
  const { setVisible } = useWalletModal();
  const { buttonState, publicKey } = useWalletMultiButton({
    onSelectWallet() {
      setVisible(true);
    },
  });

  const { signMessage, loading: loadingSignMessage } = useSignMessage();
  const user = useUser();

  if (!publicKey) {
    return (
      <Button
        ref={ref}
        {...props}
        onClick={() => setVisible(true)}
        loading={buttonState === 'connecting'}
        disabled={buttonState === 'connected'}
      >
        Connect Wallet
      </Button>
    );
  }

  if (!user) {
    return (
      <Button ref={ref} {...props} loading={loadingSignMessage} disabled={false} onClick={signMessage}>
        Sign Message
      </Button>
    );
  }
  return (
    <Button ref={ref} {...props}>
      {children}
    </Button>
  );
});
