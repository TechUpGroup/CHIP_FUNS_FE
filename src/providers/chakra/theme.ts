import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    breakpoints: {
      base: '0em', // 0px
      sm: '30em', // ~480px
      md: '48em', // ~768px
      lg: '62em', // ~992px
      xl: '80em', // ~1280px
      '2xl': '96em', // ~1536px
    },
    tokens: {
      colors: {
        bgMain: { value: 'rgba(21, 24, 29, 1)' },
        bgGame: { value: 'rgba(30, 33, 39, 1)' },
        green: { value: 'rgba(150, 240, 72, 1)' },
        dark: { value: 'rgba(142, 142, 147, 1)' },
        red: { value: 'rgba(240, 72, 75, 1)' },
      },
    },
  },
});
