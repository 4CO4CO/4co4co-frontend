import { style } from '@vanilla-extract/css';

export const container = style({
  height: '100vh',
  backgroundColor: '#f9f6ef',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 4rem',
});

export const contentWrapper = style({
  maxWidth: '1200px',
  width: '100%',
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

export const processGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '35px',
  width: '100%',
  alignItems: 'start',
});