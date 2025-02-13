'use client';

import { Icon, IconProps } from '@chakra-ui/react';

export const WithdrawIcon = (props: IconProps) => (
  <Icon w={{ base: 5, md: 6 }} h="auto" {...props}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
        stroke="#686D73"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 10.9998L21.2 2.7998"
        stroke="#686D73"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9999 6.83V2H17.1699"
        stroke="#686D73"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);
