'use client';

import { forwardRef } from 'react';

import { TitleBase, TitleBaseProps } from './TitleBase';

export const Title1 = forwardRef<HTMLDivElement, TitleBaseProps>(function Component(props, ref) {
  return <TitleBase ref={ref} fontSize={28} fontWeight={600} {...props} />;
});
