'use client';

import { Flex, FlexProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const FlexBorder = forwardRef<HTMLDivElement, FlexProps>(function Component(props, ref) {
  return (
    <Flex
      ref={ref}
      border="1px solid"
      borderColor="borderColor"
      rounded={16}
      bg="dark"
      p={4}
      align="center"
      justify="space-between"
      gap={4}
      {...props}
    />
  );
});
