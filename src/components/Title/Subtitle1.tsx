'use client';

import { Text, TextProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export type Props = TextProps;

export const Subtitle1 = forwardRef<HTMLParagraphElement, Props>(function Component(props, ref) {
  return <Text ref={ref} fontSize={18} fontWeight={500} {...props} />;
});
