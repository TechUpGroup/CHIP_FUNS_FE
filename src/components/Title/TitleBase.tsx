'use client';

import { Text, TextProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export type TitleBaseProps = TextProps;

export const TitleBase = forwardRef<HTMLParagraphElement, TitleBaseProps>(function Component(props, ref) {
  return <Text ref={ref} lineHeight={1} {...props} />;
});
