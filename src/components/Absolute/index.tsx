'use client';

import { Box, BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const Absolute = forwardRef<HTMLDivElement, BoxProps>(function Component(props, ref) {
  return <Box ref={ref} pos="absolute" top={0} left={0} w="full" h="full" {...props} />;
});
