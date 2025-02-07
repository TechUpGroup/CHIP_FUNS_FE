'use client';

import { forwardRef } from 'react';

import { TitleBase, TitleBaseProps } from './TitleBase';

export const SmallText = forwardRef<HTMLDivElement, TitleBaseProps>(function Component(props, ref) {
  return <TitleBase ref={ref} fontSize={14} {...props} />;
});
