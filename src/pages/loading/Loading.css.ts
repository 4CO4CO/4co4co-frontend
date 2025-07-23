import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

export const container = style({
  position: 'relative',
  width: '100vw',
  height: '100dvh',
  backgroundColor: colors.color.white200,
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '35rem',
  padding: '2rem',
});

export const mainTitle = style({
  color: colors.color.black,
  textAlign: 'center',
  ...fonts.font.title_28_B,
  margin: 0,
  marginBottom: '5rem',
});

export const loadingIconContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '2rem',
});

export const loadingIcon = style({
  width: '17rem',
  height: '17rem',
  flexShrink: 0,
});

export const registrationBox = style({
  width: '32rem',
  flexShrink: 0,
  borderRadius: '1.2rem',
  backgroundColor: colors.color.white,
  padding: '2rem',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginBottom: '5rem',
});

export const registrationMessage = style({
  color: colors.color.black,
  ...fonts.font.body_16_B,
  textAlign: 'left',
});

export const entryCodeSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  textAlign: 'left',
});

export const entryCodeLine = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  flexWrap: 'nowrap',
});

export const entryCodeBadge = style({
  flexShrink: 0,
  padding: '0.2rem 0.8rem',
  borderRadius: '0.75rem',
  backgroundColor: colors.color.sunsetGlow,
  color: colors.color.white,
  ...fonts.font.body_10_B,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const copyLink = style({
  color: colors.color.hyperBlue,
  ...fonts.font.body_10_R,
  textDecorationLine: 'underline',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,

  selectors: {
    '&:hover': {
      color: colors.color.deepForest,
    },
  },
});

export const entryCodeValue = style({
  color: colors.color.sunsetGlow,
  ...fonts.font.body_18_B,
});

export const warningMessage = style({
  color: colors.color.gray300,
  ...fonts.font.body_10_B,
  lineHeight: '1.4',
  textAlign: 'left',
  whiteSpace: 'pre-line',
});

export const warningEmphasis = style({
  color: colors.color.sunsetGlow,
});

export const waitingMessage = style({
  color: colors.color.gray300,
  textAlign: 'center',
  ...fonts.font.body_14_B,
  lineHeight: '1.4',
  marginBottom: '1rem',
  whiteSpace: 'pre-line',
});

export const enterButton = style({
  alignSelf: 'center',
  padding: '1.8rem 8rem !important',
});