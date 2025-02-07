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
        bgMain: { value: 'rgba(0, 0, 0, 1)' },
        tabColor: { value: '#251d1d' },
        dark: { value: 'rgba(15, 15, 15, 1)' },
        borderColor: { value: 'rgba(255, 255, 255, 0.05)' },
        bgButton: { value: 'rgba(29, 29, 29, 1)' },
        green: { value: '#00E578' },
        black: { value: '#000' },
        red: { value: '#FF3E00' },
      },
    },
  },
});
