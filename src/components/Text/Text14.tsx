'use client';

import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from './TextBase';

export const Text14 = forwardRef<HTMLDivElement, TextBaseProps>(function Component(props, ref) {
  return <TextBase ref={ref} fontSize={14} lineHeight={20 / 14} {...props} />;
});
