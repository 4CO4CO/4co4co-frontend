import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export const container = style({
  width: '100%',
  display: 'flex',
  gap: '0.8rem',

  '::-webkit-scrollbar-track': {
    background: 'transparent',
    marginLeft: '3.2rem',
    marginRight: '3.2rem',
  },

  '@media': {
    [MOBILE_MEDIA_QUERY]: {
      width: 'calc(100% + 6.4rem)',
      overflowX: 'auto',
      padding: '0 3.2rem',
      marginLeft: '-3.2rem',
      marginRight: '-3.2rem',
    },
  },
});

export const upload_button = style({
  width: '15rem',
  height: '26.8rem',
  backgroundColor: colors.color.white,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  overflow: 'hidden',
  flexShrink: '0',
});

export const previewImage = style({
  width: '31.5rem',
  height: '26.8rem',
  objectFit: 'cover',
  borderRadius: '12px',

  '@media': {
    [MOBILE_MEDIA_QUERY]: {
      width: '15rem',
    },
  },
});

export const textarea = style({
  marginTop: '1rem',
  width: '31.5rem',
  padding: '0.5rem',
  border: `1px solid ${colors.color.gray200}`,
  borderRadius: '0.4rem',
  ...fonts.font.body_14_B,

  '@media': {
    [MOBILE_MEDIA_QUERY]: {
      width: '15rem',
    },
  },
});
