'use client';

import { Icon, IconProps } from '@chakra-ui/react';

export const ClaimIcon = (props: IconProps) => (
  <Icon w={{ base: '28px', md: '32px' }} h="auto" {...props}>
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.4">
        <path
          d="M11.5625 19.1061C11.5625 20.8261 12.8825 22.2128 14.5225 22.2128H17.8692C19.2958 22.2128 20.4558 20.9995 20.4558 19.5061C20.4558 17.8795 19.7492 17.3061 18.6958 16.9328L13.3225 15.0661C12.2692 14.6928 11.5625 14.1195 11.5625 12.4928C11.5625 10.9995 12.7225 9.78613 14.1492 9.78613H17.4958C19.1358 9.78613 20.4558 11.1728 20.4558 12.8928"
          stroke="#96F048"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M16 8V24" stroke="#96F048" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path
        d="M20.0001 29.3337H12.0001C5.33341 29.3337 2.66675 26.667 2.66675 20.0003V12.0003C2.66675 5.33366 5.33341 2.66699 12.0001 2.66699H20.0001C26.6667 2.66699 29.3334 5.33366 29.3334 12.0003V20.0003C29.3334 26.667 26.6667 29.3337 20.0001 29.3337Z"
        stroke="#96F048"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);
