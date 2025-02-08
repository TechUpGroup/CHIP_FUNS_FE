'use client';

import { Icon, IconProps } from '@chakra-ui/react';

export const TransactionIcon = (props: IconProps) => (
  <Icon w={'32px'} h="auto" {...props}>
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.4"
        d="M29.3333 11.3337C29.3333 16.1203 25.4533 20.0003 20.6667 20.0003C20.44 20.0003 20.2 19.987 19.9733 19.9737C19.64 15.747 16.2533 12.3603 12.0267 12.027C12.0133 11.8003 12 11.5603 12 11.3337C12 6.54699 15.88 2.66699 20.6667 2.66699C25.4533 2.66699 29.3333 6.54699 29.3333 11.3337Z"
        stroke="#96F048"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.9998 20.6667C19.9998 25.4533 16.1198 29.3333 11.3332 29.3333C6.5465 29.3333 2.6665 25.4533 2.6665 20.6667C2.6665 15.88 6.5465 12 11.3332 12C11.5598 12 11.7998 12.0133 12.0265 12.0267C16.2532 12.36 19.6399 15.7467 19.9732 19.9733C19.9865 20.2 19.9998 20.44 19.9998 20.6667Z"
        stroke="#96F048"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M10.16 19.493L11.3333 17.333L12.5067 19.493L14.6667 20.6663L12.5067 21.8397L11.3333 23.9997L10.16 21.8397L8 20.6663L10.16 19.493Z"
        stroke="#96F048"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);
