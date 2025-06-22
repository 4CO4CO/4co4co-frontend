import { style } from '@vanilla-extract/css';

export const container = style({
  height: '100vh',
  backgroundColor: '#f9f6ef',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 4rem',
});

export const contentWrapper = style({
  maxWidth: '1200px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const title = style({
  color: '#000',
  fontFamily: 'Pretendard',
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: 'normal',
  letterSpacing: '2.8px',
  marginBottom: '36px',
  textAlign: 'left',
});

export const ticketWrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '44px',
});

export const ticketIcon = style({
  width: '310px',
  height: '222px',
  objectFit: 'contain',
});

export const startButton = style({
  alignSelf: 'center',
  borderRadius: '10px',
  background: '#FCBC42',
  padding: '18px 65px',
  cursor: 'pointer',
  border: 'none',
  marginBottom: '32px',

  color: '#000',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: 'normal',
});

export const option = style({
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
});

export const optionText = style({
  color: '#000',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 'normal',
});

export const linkButton = style({
  color: '#1C4EFF',
  fontFamily: 'Pretendard',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 'normal',
  textDecoration: 'underline',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
});