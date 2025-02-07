'use client';

import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from './TextBase';

export const Text24 = forwardRef<HTMLDivElement, TextBaseProps>(function Component(props, ref) {
  return <TextBase ref={ref} fontSize={24} lineHeight={32 / 24} {...props} />;
});
