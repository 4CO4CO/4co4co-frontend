import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

export const textArea = style({
  width: '30rem',
  padding: '1.8rem 1.2rem',
  borderRadius: '0.7rem',
  backgroundColor: colors.color.white,
  color: colors.color.black,
  ...fonts.font.body_15_M,
  outline: 'none',
  boxSizing: 'border-box',
  resize: 'none',
  minHeight: '10rem',

  selectors: {
    '&::placeholder': {
      color: colors.color.gray200,
    },
  },
});