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
        green: { value: 'rgba(150, 240, 72, 1)' },
      },
    },
  },
});
