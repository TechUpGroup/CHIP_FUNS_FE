'use client';

import { Icon, IconProps } from '@chakra-ui/react';

export const CopyIcon = (props: IconProps) => (
  <Icon w={'12px'} h="auto" {...props}>
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.5"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 1.8C3 0.80589 3.80589 0 4.8 0H10.2C11.1941 0 12 0.80589 12 1.8V7.2C12 8.19414 11.1941 9 10.2 9H9V10.2C9 11.1941 8.19414 12 7.2 12H1.8C0.80589 12 0 11.1941 0 10.2V4.8C0 3.80589 0.80589 3 1.8 3H3V1.8ZM4.2 3H7.2C8.19414 3 9 3.80589 9 4.8V7.8H10.2C10.5314 7.8 10.8 7.53138 10.8 7.2V1.8C10.8 1.46863 10.5314 1.2 10.2 1.2H4.8C4.46863 1.2 4.2 1.46863 4.2 1.8V3ZM1.8 4.2C1.46863 4.2 1.2 4.46863 1.2 4.8V10.2C1.2 10.5314 1.46863 10.8 1.8 10.8H7.2C7.53138 10.8 7.8 10.5314 7.8 10.2V4.8C7.8 4.46863 7.53138 4.2 7.2 4.2H1.8Z"
        fill="white"
      />
    </svg>
  </Icon>
);
