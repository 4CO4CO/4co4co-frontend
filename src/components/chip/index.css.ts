import { style } from '@vanilla-extract/css';
import { colors } from './../../styles/color.css';
import { fonts } from './../../styles/font.css';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  padding: '0.4rem 0.8rem',
  ...fonts.font.body_18_B,
  color: colors.color.white,
  borderRadius: '9999px',
  background: colors.color.sunsetGlow,

  '@media': {
    [MOBILE_MEDIA_QUERY]: {
      padding: '0.1rem 0.4rem',
      ...fonts.font.body_10_B,
    },
  },
});
