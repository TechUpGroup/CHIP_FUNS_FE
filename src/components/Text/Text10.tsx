'use client';

import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from './TextBase';

export const Text10 = forwardRef<HTMLDivElement, TextBaseProps>(function Component(props, ref) {
  return <TextBase ref={ref} fontSize={10} lineHeight={1.6} {...props} />;
});
