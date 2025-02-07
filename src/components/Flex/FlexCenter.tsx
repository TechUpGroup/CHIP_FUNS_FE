'use client';

import { Flex, FlexProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const FlexCenter = forwardRef<HTMLDivElement, FlexProps>(function Component(props, ref) {
  return <Flex ref={ref} align="center" {...props} />;
});
