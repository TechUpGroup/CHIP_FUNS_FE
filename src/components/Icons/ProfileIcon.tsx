'use client';

import { Icon, IconProps } from '@chakra-ui/react';

export const ProfileIcon = (props: IconProps) => (
  <Icon w={8} h="auto" {...props}>
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28.1066 11.4404V20.5603C28.1066 22.0537 27.3066 23.4404 26.0132 24.2004L18.0932 28.7737C16.7999 29.5204 15.1999 29.5204 13.8932 28.7737L5.97322 24.2004C4.67988 23.4537 3.87988 22.067 3.87988 20.5603V11.4404C3.87988 9.94704 4.67988 8.56032 5.97322 7.80032L13.8932 3.22699C15.1866 2.48033 16.7865 2.48033 18.0932 3.22699L26.0132 7.80032C27.3066 8.56032 28.1066 9.9337 28.1066 11.4404Z"
        stroke="#96F048"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M16.0002 14.6664C17.716 14.6664 19.1069 13.2755 19.1069 11.5597C19.1069 9.84397 17.716 8.45312 16.0002 8.45312C14.2845 8.45312 12.8936 9.84397 12.8936 11.5597C12.8936 13.2755 14.2845 14.6664 16.0002 14.6664Z"
        stroke="#96F048"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M21.3332 22.2138C21.3332 19.8138 18.9465 17.8672 15.9998 17.8672C13.0532 17.8672 10.6665 19.8138 10.6665 22.2138"
        stroke="#96F048"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);
