'use client';

import { Icon, IconProps } from '@chakra-ui/react';

export const DepositIcon = (props: IconProps) => (
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
        d="M21.9998 2L13.7998 10.2"
        stroke="#686D73"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 6.16992V10.9999H17.83"
        stroke="#686D73"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);
