'use client';

import { Icon, IconProps } from '@chakra-ui/react';

export const PlusIcon = (props: IconProps) => (
  <Icon w={'16px'} h="auto" {...props}>
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 0H1C0.4 0 0 0.4 0 1V15C0 15.6 0.4 16 1 16H15C15.6 16 16 15.6 16 15V1C16 0.4 15.6 0 15 0ZM12 9H9V12H7V9H4V7H7V4H9V7H12V9Z"
        fill="black"
      />
    </svg>
  </Icon>
);
