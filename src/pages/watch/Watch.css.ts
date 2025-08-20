import { style } from '@vanilla-extract/css';
import { colors } from './../../styles/color.css';
import { fonts } from './../../styles/font.css';

export const container = style({
  width: '100vw',
  height: '100vh',
  background: colors.color.black,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const text = style({
  textAlign: 'center',
  ...fonts.font.title_18_B,
  color: colors.color.white,
});
