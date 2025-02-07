'use client';

import { Text, TextProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export type TextBaseProps = TextProps & {
  fontKaran?: boolean;
};

export const TextBase = forwardRef<HTMLDivElement, TextBaseProps>(function Component(props, ref) {
  return <Text ref={ref} fontFamily={props.fontKaran ? 'var(--font-karantina)' : undefined} {...props} />;
});
