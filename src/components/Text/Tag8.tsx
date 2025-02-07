'use client';

import { forwardRef } from 'react';

import { Text8 } from './Text8';
import { TextBaseProps } from './TextBase';

export const Tag8 = forwardRef<HTMLDivElement, TextBaseProps>(function Component(props, ref) {
  return (
    <Text8 ref={ref} fontSize={8} lineHeight={1.75} fontWeight={500} px={1} rounded={2} color="white" {...props} />
  );
});
