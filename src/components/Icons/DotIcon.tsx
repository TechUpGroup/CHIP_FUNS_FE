'use client';

import { Icon, IconProps } from '@chakra-ui/react';

export const DotIcon = (props: IconProps) => (
  <Icon w={{ base: '40px', md: '57px' }} h="auto" {...props}>
    <svg viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <path
        d="M42.66 42.8317C50.4447 35.047 50.4447 22.4256 42.6601 14.641C34.8754 6.85632 22.254 6.85637 14.4693 14.641C6.6847 22.4257 6.68473 35.047 14.4694 42.8317C22.254 50.6163 34.8754 50.6163 42.66 42.8317Z"
        fill="url(#paint0_linear_3076_1169)"
      />
      <mask
        id="mask0_3076_1169"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="18"
        y="18"
        width="27"
        height="27"
      >
        <path
          d="M44.1181 30.1907C44.1181 37.9771 37.8098 44.2853 30.0235 44.2853C25.2862 44.2853 21.0998 41.9532 18.542 38.3731C20.8454 40.0127 23.6665 40.9796 26.7134 40.9796C34.4997 40.9796 40.8079 34.6669 40.8079 26.8806C40.8079 23.8338 39.841 21.0126 38.197 18.707C41.7815 21.2604 44.1181 25.4556 44.1181 30.1907Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_3076_1169)">
        <mask
          id="mask1_3076_1169"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="17"
          y="17"
          width="29"
          height="29"
        >
          <path d="M45.2233 17.6006H17.4346V45.3915H45.2233V17.6006Z" fill="white" />
        </mask>
        <g mask="url(#mask1_3076_1169)">
          <rect x="17.4307" y="17.5586" width="27.8795" height="27.8795" fill="url(#pattern0_3076_1169)" />
        </g>
      </g>
      <defs>
        <pattern id="pattern0_3076_1169" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_3076_1169" transform="scale(0.00793651)" />
        </pattern>
        <linearGradient
          id="paint0_linear_3076_1169"
          x1="24.1165"
          y1="19.9245"
          x2="43.5835"
          y2="58.4823"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="0.11" stopColor="#050505" />
          <stop offset="0.24" stopColor="#141514" />
          <stop offset="0.4" stopColor="#2E2E2D" />
          <stop offset="0.56" stopColor="#525250" />
          <stop offset="0.73" stopColor="#80807D" />
          <stop offset="0.91" stopColor="#B7B8B4" />
          <stop offset="1" stopColor="#D8D9D4" />
        </linearGradient>
        <image
          id="image0_3076_1169"
          width="126"
          height="126"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  </Icon>
);
