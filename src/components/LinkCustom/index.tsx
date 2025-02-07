'use client';

import { Link, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { forwardRef } from 'react';

export const LinkCustom = forwardRef<HTMLAnchorElement, LinkProps>(function Component({ _hover, ...props }, ref) {
  return (
    <Link
      ref={ref}
      as={NextLink}
      _hover={{ textDecoration: 'none', ..._hover }}
      _focus={{ outline: 'unset' }}
      {...props}
    />
  );
});
