import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100vw',
  height: '100dvh',
  backgroundColor: '#f9f6ef',
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
  maxWidth: '350px',
  padding: '20px',
});

export const mainTitle = style({
  color: '#000',
  fontFamily: 'Pretendard',
  textAlign: 'center',
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: 'normal',
  letterSpacing: '2.8px',
  margin: 0,
  marginBottom: '50px',
});

export const loadingIconContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
});

export const loadingIcon = style({
  width: '170px',
  height: '170px',
  flexShrink: 0,
});

export const registrationBox = style({
  width: '320px',
  flexShrink: 0,
  borderRadius: '12px',
  background: '#FFF',
  padding: '20px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  marginBottom: '50px',
});

export const registrationMessage = style({
  color: '#000',
  fontFamily: 'Pretendard',
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: 'normal',
  letterSpacing: '1.6px',
  textAlign: 'left',
});

export const entryCodeSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  textAlign: 'left',
});

export const entryCodeLine = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'nowrap',
});

export const entryCodeBadge = style({
  flexShrink: 0,
  padding: '2px 8px',
  borderRadius: '7.5px',
  background: '#F8A12C',

  color: '#FFF',
  fontFamily: 'Pretendard',
  fontSize: '10px',
  fontWeight: 700,
  lineHeight: 'normal',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const copyLink = style({
  color: '#1C4EFF',
  fontFamily: 'Pretendard',
  fontSize: '10px',
  fontWeight: 400,
  textDecorationLine: 'underline',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,

  ':hover': {
    color: '#0039CC',
  },
});

export const entryCodeValue = style({
  color: '#F89D2C',
  fontFamily: 'Pretendard',
  fontSize: '10px',
  fontWeight: 700,
  lineHeight: 'normal',
});

export const warningMessage = style({
  color: '#626262',
  fontFamily: 'Pretendard',
  fontSize: '10px',
  fontWeight: 700,
  lineHeight: '1.4',
  textAlign: 'left',
  whiteSpace: 'pre-line',
});

export const warningEmphasis = style({
  color: '#F89D2C',
  fontFamily: 'Pretendard',
  fontSize: '10px',
  fontWeight: 700,
  lineHeight: 'normal',
});

export const waitingMessage = style({
  color: '#626262',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '1.4',
  marginBottom: '10px',
  whiteSpace: 'pre-line',
});

export const enterButton = style({
  padding: '18px 80px',
  flexShrink: 0,
  borderRadius: '10px',
  background: '#FCBC42',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  color: '#000',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: 'normal',
});