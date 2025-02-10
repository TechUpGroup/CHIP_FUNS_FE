'use client';

import { Icon, IconProps } from '@chakra-ui/react';

export const CardIcon = (props: IconProps) => (
  <Icon w={6} h="auto" {...props}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 2H6V22H21V2Z" stroke="#96F048" strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M2 5.895L6 5V22L2 5.895Z"
        stroke="#96F048"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.5 9L11 12L13.5 15L16 12L13.5 9Z" stroke="#96F048" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 5V7M18 17V19" stroke="#96F048" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Icon>
);
