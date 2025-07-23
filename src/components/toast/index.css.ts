import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

export const toast = style({
  position: 'fixed',
  top: '2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '1.2rem 2.4rem',
  borderRadius: '0.8rem',
  color: colors.color.white,
  ...fonts.font.body_14_B,
  zIndex: 9999,
  minWidth: '20rem',
  textAlign: 'center',
});

export const success = style({
  backgroundColor: colors.color.green900,
});

export const error = style({
  backgroundColor: colors.color.dangerous,
});

export const info = style({
  backgroundColor: colors.color.hyperBlue,
});
