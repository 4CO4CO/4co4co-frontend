import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

export const input = style({
  border: 'none',
  borderRadius: '7px',
  cursor: 'pointer',
  width: '100%',
  height: '5.3rem',

  ...fonts.font.body_15_M,
  background: colors.color.white,
  color: colors.color.black,
  display: 'flex',
  alignItems: 'center',
  padding: '0 1.2rem',

  '::placeholder': {
    color: colors.color.gray200,
  },
});
