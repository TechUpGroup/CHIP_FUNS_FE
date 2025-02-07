'use client';

import { forwardRef } from 'react';

import { TitleBase, TitleBaseProps } from './TitleBase';

export const Title = forwardRef<HTMLDivElement, TitleBaseProps>(function Component(props, ref) {
  return <TitleBase ref={ref} fontSize={24} fontWeight={600} lineHeight={1.4} p={4} {...props} />;
});
