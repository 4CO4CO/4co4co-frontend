import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

const buttonBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '1rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  textDecoration: 'none',
  boxSizing: 'border-box',
});

export const primaryLg = style([
  buttonBase,
  {
    padding: '1.7rem 9rem',
    backgroundColor: colors.color.goldenMemories,
    color: colors.color.black,
    ...fonts.font.body_16_B,

    selectors: {
      '&:hover': {
        backgroundColor: colors.color.sunsetGlow,
        transform: 'translateY(-1px)',
      },
      '&:disabled': {
        backgroundColor: colors.color.morningGold,
        cursor: 'not-allowed',
      },
    },
  },
]);

export const primarySm = style([
  buttonBase,
  {
    padding: '1.7rem 4.5rem',
    backgroundColor: colors.color.goldenMemories,
    color: colors.color.black,
    ...fonts.font.body_14_B,

    selectors: {
      '&:hover': {
        backgroundColor: colors.color.sunsetGlow,
        transform: 'translateY(-1px)',
      },
      '&:disabled': {
        backgroundColor: colors.color.morningGold,
      },
    },
  },
]);

export const secondaryLg = style([
  buttonBase,
  {
    padding: '1.7rem 3.3rem',
    backgroundColor: colors.color.gray100,
    color: colors.color.black,
    ...fonts.font.body_16_B,

    selectors: {
      '&:hover': {
        backgroundColor: colors.color.gray200,
        transform: 'translateY(-1px)',
      },
    },
  },
]);

export const secondarySm = style([
  buttonBase,
  {
    padding: '1.7rem 2.5rem',
    backgroundColor: colors.color.gray100,
    color: colors.color.black,
    ...fonts.font.body_14_B,

    selectors: {
      '&:hover': {
        backgroundColor: colors.color.gray200,
        transform: 'translateY(-1px)',
      },
    },
  },
]);

export const dangerousLg = style([
  buttonBase,
  {
    padding: '1.7rem 3.3rem',
    backgroundColor: colors.color.dangerous,
    color: colors.color.white,
    ...fonts.font.body_16_B,
  },
]);

export const dangerousSm = style([
  buttonBase,
  {
    padding: '1.7rem 2.5rem',
    backgroundColor: colors.color.dangerous,
    color: colors.color.white,
    ...fonts.font.body_14_B,
  },
]);