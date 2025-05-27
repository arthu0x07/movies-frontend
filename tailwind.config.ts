import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserratExtrabold: ['var(--font-montserrat-extrabold)'],
        montserratSemibold: ['var(--font-montserrat-semibold)'],
        montserratBold: ['var(--font-montserrat-bold)'],
        montserratMedium: ['var(--font-montserrat-medium)'],
        montserratRegular: ['var(--font-montserrat-regular)'],
        robotoRegular: ['var(--font-roboto-regular)'],
        robotoBold: ['var(--font-roboto-bold)'],
      },
      breakpoints: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1536px',
      },
      fontSize: {
        xs: '0.5rem', // 8px
        sm: '0.625rem', // 10px
        md: '0.75rem', // 12px
        lg: '0.875rem', // 14px
        base: '1rem', // 16px
        xl: '1.125rem', // 18px
        '2xl': '1.25rem', // 20px
        '3xl': '1.5rem', // 24px
        '4xl': '1.875rem', // 30px
        '5xl': '2.25rem', // 36px
        '6xl': '2.8125rem', // 45px
      },
      colors: {
        'purple-dark': {
          1: '#18111B',
          2: '#1E1523',
          3: '#3D224E',
          4: '#3D224E',
          5: '#48295C',
          6: '#54346B',
          7: '#664282',
          8: '#8457AA',
          9: '#8E4EC6',
          10: '#9A5CD0',
          11: '#D19DFF',
          12: '#ECD9FA',
        },
        'purple-dark-alpha': {
          1: '#B412F906',
          2: '#B744F70D',
          3: '#C150FF2D',
          4: '#BB53FD42',
          5: '#BE5CFD52',
          6: '#C16DFD61',
          7: '#C378FD7A',
          8: '#C47EFFA3',
          9: '#B661FFC2',
          10: '#BC6FFFCC',
          11: '#D19DFF',
          12: '#F1DDFFF9',
          13: '#B744F714 ',
        },
        purple: {
          1: '#FEFCFE',
          2: '#FBF7FE',
          3: '#F7EDFE',
          4: '#F2E2FC',
          5: '#EAD5F9',
          6: '#E0C4F4',
          7: '#D1AFEC',
          8: '#BE93E4',
          9: '#8E4EC6',
          10: '#8347B9',
          11: '#8145B5',
          12: '#402060',
        },
        'purple-alpha': {
          1: '#AA00AA03',
          2: '#8000E007',
          3: '#8E00F10B',
          4: '#8D00E911',
          5: '#8000DB29',
          6: '#7A01D03A',
          7: '#6D00C34F',
          8: '#6600C060',
          9: '#5C00ADB0',
          10: '#53009DB8',
          11: '#52009ABA',
          12: '#250049DE',
        },
        'mauve-dark': {
          1: '#121113',
          2: '#1A191B',
          3: '#232225',
          4: '#2B292D',
          5: '#323035',
          6: '#3C393F',
          7: '#49474E',
          8: '#625F69',
          9: '#6F6D78',
          10: '#7C7A85',
          11: '#B5B2BC',
          12: '#EEEEF0',
        },
        'mauve-dark-alpha': {
          1: '#00000000',
          2: '#F5F4F60A',
          3: '#EBEAF814',
          4: '#EEE5F81C',
          5: '#EFE6FE26',
          6: '#F1E6FD30',
          7: '#EEE9FF40',
          8: '#EEE7FF5C',
          9: '#EAE6FD6E',
          10: '#ECE9FD7D',
          11: '#F5F1FFB8',
          12: '#FDFDFFF0',
        },
        mauve: {
          1: '#FDFCFD',
          2: '#FAF9FB',
          3: '#F2EFF3',
          4: '#EAE7EC',
          5: '#E3DFE6',
          6: '#DBD8E0',
          7: '#D0CDD7',
          8: '#BCBAC7',
          9: '#8E8C99',
          10: '#84828E',
          11: '#65636D',
          12: '#211F26',
        },
        'mauve-alpha': {
          1: '#FDF7FD',
          2: '#F9F2FB',
          3: '#F2E8F5',
          4: '#EADDF0',
          5: '#E2D1E9',
          6: '#D8C3E3',
          7: '#CAB4DB',
          8: '#BFA5D5',
          9: '#A78FC8',
          10: '#967CB7',
          11: '#6F518C',
          12: '#2C1439',
        },
        'custom-purple': {
          1: '#F1DDFFFA',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
