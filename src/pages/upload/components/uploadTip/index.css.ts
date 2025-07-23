import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export const container = style({
  width: '100%',
  maxWidth: '49.5rem',
  padding: '2rem',
  background: colors.color.white,
  borderRadius: '12px',
});

export const title = style({
  color: colors.color.black,
  ...fonts.font.body_16_B,
  fontSize: '2.2rem',
  whiteSpace: 'pre-wrap',

  '@media': {
    [MOBILE_MEDIA_QUERY]: {
      ...fonts.font.body_16_B,
    },
  },
});

export const tip_wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const tip_item = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  ...fonts.font.body_18_B,
  color: colors.color.gray300,

  '@media': {
    [MOBILE_MEDIA_QUERY]: {
      ...fonts.font.body_10_B,
    },
  },
});
