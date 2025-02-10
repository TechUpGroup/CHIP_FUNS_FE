'use client';

import { AbsoluteCenter, ButtonProps, chakra, Span, Spinner } from '@chakra-ui/react';
import { forwardRef } from 'react';

export type ButtonBaseProps = ButtonProps & {
  loading?: boolean;
  loadingText?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonBaseProps>(function Component(
  { loading, loadingText, disabled, children, ...props },
  ref,
) {
  return (
    <chakra.button
      display="flex"
      alignItems="center"
      justifyContent="center"
      ref={ref}
      transition="all .3s linear"
      cursor="pointer"
      // _hover={{
      //   opacity: 1,
      // }}
      _disabled={{
        opacity: 0.4,
        cursor: 'not-allowed',
      }}
      // _active={{
      //   opacity: 1,
      // }}
      // _focus={{
      //   opacity: 1,
      // }}
      position="relative"
      {...props}
      disabled={loading || disabled}
    >
      {loading && !loadingText ? (
        <>
          <AbsoluteCenter display="inline-flex">
            <Spinner size="inherit" color="inherit" />
          </AbsoluteCenter>
          <Span opacity={0}>{children}</Span>
        </>
      ) : loading && loadingText ? (
        <>
          <Spinner size="inherit" color="inherit" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </chakra.button>
  );
});
