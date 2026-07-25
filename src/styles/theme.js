import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  headings: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: '700',
  },
  colors: {
    navy: [
      '#eef1f8',
      '#d3daed',
      '#a6b5da',
      '#7890c8',
      '#4f6fb8',
      '#2f54a8',
      '#1c3f8f',
      '#122d6e',
      '#0b1f52',
      '#071438',
    ],
    gold: [
      '#fdf8ec',
      '#f8ebc8',
      '#f1d99a',
      '#e9c569',
      '#e2b544',
      '#d9a521',
      '#b8871a',
      '#8f6914',
      '#664b0e',
      '#3d2c08',
    ],
  },
  primaryColor: 'navy',
  primaryShade: 8,
  defaultRadius: 'md',
  shadows: {
    xs: '0 1px 3px rgba(11, 31, 82, 0.06)',
    sm: '0 2px 8px rgba(11, 31, 82, 0.08)',
    md: '0 8px 24px rgba(11, 31, 82, 0.10)',
    lg: '0 16px 40px rgba(11, 31, 82, 0.12)',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'xl',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
      },
    },
  },
});

export const COLORS = {
  navyDark: '#071438',
  navy: '#0b1f52',
  navyLight: '#122d6e',
  gold: '#d9a521',
  goldSoft: '#e9c569',
  white: '#ffffff',
  offWhite: '#f7f8fb',
  grayLight: '#eef1f6',
  textMuted: '#5b6478',
};
