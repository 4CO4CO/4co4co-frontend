import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

export const buttonBase = style({
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  width: '100%',
  height: '5.3rem',

  color: colors.color.black,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
});

export const sizeStyles = styleVariants({
  lg: {
    ...fonts.font.body_16_B,
  },
  sm: {
    ...fonts.font.body_14_B,
  },
});

export const variantStyles = styleVariants({
  primary: {
    backgroundColor: colors.color.goldenMemories,
    color: colors.color.black,
    ':hover': {
      backgroundColor: colors.color.sunsetGlow,
      transform: 'translateY(-1px)',
    },
    ':disabled': {
      backgroundColor: colors.color.morningGold,
      cursor: 'not-allowed',
    },
  },
  secondary: {
    backgroundColor: colors.color.gray100,
    color: colors.color.white,
    ':hover': {
      backgroundColor: colors.color.gray200,
      transform: 'translateY(-1px)',
    },
    width: '9.4rem',
  },
  dangerous: {
    backgroundColor: colors.color.dangerous,
    color: colors.color.white,
  },
});
