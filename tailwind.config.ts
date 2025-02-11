import type { Config } from 'tailwindcss';

export default {
  corePlugins: {
    preflight: false, // Tắt hoàn toàn CSS reset
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        darker: ['var(--font-darker-grotesque)'],
        workSans: ['var(--font-work-sans)'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },

  plugins: [],
} satisfies Config;
