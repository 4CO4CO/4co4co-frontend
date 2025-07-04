import { style } from '@vanilla-extract/css';
import { colors } from './../../styles/color.css';
import { fonts } from './../../styles/font.css';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '9rem 15.5rem',

  '@media': {
    [MOBILE_MEDIA_QUERY]: {
      padding: '6rem 3.2rem',
    },
  },
});

export const title = style({
  ...fonts.font.title_28_B,
  whiteSpace: 'pre-wrap',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const desktopOnly = style({
  display: 'block',

  '@media': {
    [MOBILE_MEDIA_QUERY]: {
      display: 'none',
    },
  },
});

export const mobileOnly = style({
  display: 'none',

  '@media': {
    [MOBILE_MEDIA_QUERY]: {
      display: 'block',
    },
  },
});

export const description = style({
  ...fonts.font.body_18_B,
  color: colors.color.gray300,
  '@media': {
    [MOBILE_MEDIA_QUERY]: { ...fonts.font.body_10_B },
  },
});

export const label = style({
  ...fonts.font.body_18_B,
  marginBottom: '0.8rem',
});

export const button_wrapper = style({
  width: '100%',
  maxWidth: '31.1rem',
  display: 'flex',
  gap: '0.6rem',
});
