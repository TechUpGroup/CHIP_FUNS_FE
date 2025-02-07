'use client';

import { Box, BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const Line = forwardRef<HTMLDivElement, BoxProps>(function Component(props, ref) {
  return <Box ref={ref} w="full" borderBottom="1px solid" borderColor="borderColor" {...props} />;
});
