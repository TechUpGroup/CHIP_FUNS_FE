'use client';

import { forwardRef } from 'react';

import { TitleBase, TitleBaseProps } from './TitleBase';

export const Title2 = forwardRef<HTMLDivElement, TitleBaseProps>(function Component(props, ref) {
  return <TitleBase ref={ref} fontSize={22} {...props} />;
});
