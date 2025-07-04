import { style } from '@vanilla-extract/css';
import { colors } from './../../styles/color.css';
import { fonts } from './../../styles/font.css';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export const container = style({
  '@media': {
    [MOBILE_MEDIA_QUERY]: {
      display: 'flex',
      flexDirection: 'column',
      padding: '3.2rem 6rem',
      margin: '0 auto',
    },
  },
});

export const title = style({
  ...fonts.font.title_28_B,
  whiteSpace: 'pre-wrap',
});

export const description = style({
  ...fonts.font.body_18_B,
  color: colors.color.gray300,
  '@media': {
    [MOBILE_MEDIA_QUERY]: { ...fonts.font.body_10_B },
  },
});
