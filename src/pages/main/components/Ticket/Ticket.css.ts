import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

export const container = style({
  height: '100vh',
  backgroundColor: colors.color.white200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 4rem',

  '@media': {
    '(max-width: 798px)': {
      padding: '0 2rem',
    }
  }
});

export const contentWrapper = style({
  maxWidth: '1200px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const title = style({
  color: colors.color.black,
  ...fonts.font.title_28_B,
  marginBottom: '3.6rem',
  textAlign: 'left',
});

export const ticketWrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '4.4rem',
});

export const ticketIcon = style({
  width: '31rem',
  height: '22.2rem',
  objectFit: 'contain',

  '@media': {
    '(max-width: 798px)': {
      width: '21rem',
      height: '15rem',
    }
  }
});

export const startButton = style({
  alignSelf: 'center',
  borderRadius: '1rem',
  background: colors.color.goldenMemories,
  padding: '1.8rem 6.5rem',
  cursor: 'pointer',
  border: 'none',
  marginBottom: '3.2rem',

  color: colors.color.black,
  textAlign: 'center',
  ...fonts.font.body_16_B,

  ':hover': {
    background: colors.color.sunsetGlow,
    transform: 'translateY(-1px)',
  },

  ':active': {
    transform: 'translateY(0)',
  },
});

export const option = style({
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.4rem',
});

export const optionText = style({
  color: colors.color.black,
  textAlign: 'center',
  ...fonts.font.body_16_R,
});

export const linkButton = style({
  color: colors.color.hyperBlue,
  ...fonts.font.body_16_R,
  textDecoration: 'underline',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
});