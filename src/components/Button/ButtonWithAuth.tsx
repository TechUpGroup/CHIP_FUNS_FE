'use client';

import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { forwardRef } from 'react';
import { useSignMessage } from '@/hooks/useSignMessage';
import { useUser } from '@/store/useUserStore';
import { Button, ButtonBaseProps } from './ButtonBase';

export const ButtonWithAuth = forwardRef<HTMLButtonElement, ButtonBaseProps>(function Component(
  { children, ...props },
  ref,
) {
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();

  const { signMessage, loading: loadingSignMessage } = useSignMessage();
  const user = useUser();

  if (!isConnected) {
    return (
      <Button
        ref={ref}
        {...props}
        onClick={() => open()}
        // loading={buttonState === 'connecting'}
        // disabled={buttonState === 'connected'}
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
