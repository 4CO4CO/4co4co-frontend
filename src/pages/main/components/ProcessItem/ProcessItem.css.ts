import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '3rem',
  backgroundColor: colors.color.white,
  borderRadius: '2rem',
  width: '30rem',
  position: 'relative',
  boxSizing: 'border-box',

  '@media': {
    '(max-width: 798px)': {
      padding: '2rem 1.4rem',
      width: '14rem',
    }
  }
});

export const title = style({
  color: colors.color.black,
  ...fonts.font.title_28_B,
  margin: 0,
  textAlign: 'left',

  '@media': {
    '(max-width: 798px)': {
      ...fonts.font.title_18_B,
    }
  }
});

export const iconWrapper = style({
  display: 'flex',
  justifyContent: 'flex-end',
  flex: 1,
  alignItems: 'center',

  '@media': {
    '(max-width: 798px)': {
      justifyContent: 'center',
      flex: 1,
    }
  }
});

export const icon = style({
  width: '13.5rem',
  height: '13.5rem',
  objectFit: 'contain',
  margin: '1.5rem 0',

  '@media': {
    '(max-width: 798px)': {
      width: '7.5rem',
      height: '7.5rem',
      flexShrink: 0,
    }
  }
});

export const description = style({
  color: colors.color.gray300,
  ...fonts.font.body_18_B,
  margin: 0,
  textAlign: 'left',

  '@media': {
    '(max-width: 798px)': {
      ...fonts.font.body_10_R,
      fontWeight: 700,
      textAlign: 'left',
    }
  }
});