'use client';

import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from './TextBase';

export const Text32 = forwardRef<HTMLDivElement, TextBaseProps>(function Component(props, ref) {
  return <TextBase ref={ref} fontSize={32} lineHeight={1.5} {...props} />;
});
