import { style } from '@vanilla-extract/css';

export const mainWrapper = style({
  padding: '0 155px',
  paddingBottom: '92px',
});

export const logoWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  transform: 'translateX(20px)',
  marginTop: '208px',
  marginBottom: '80px',
});

export const navigateWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '36px',
});

export const titleStyle = style({
  width: '100%',
  textAlign: 'left',
  fontSize: '28px',
});

export const buttonStyle = style({
  fontSize: '16px',
  background: '#FCBC42',
  width: '311px',
  height: '53px',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
});
