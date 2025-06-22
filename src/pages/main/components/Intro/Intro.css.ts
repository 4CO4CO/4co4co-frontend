import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100vw',
  height: '100vh',
  backgroundColor: '#f9f6ef',
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

export const textWrapper = style({
  position: 'absolute',
  top: '30vh',
  left: '50%',
  transform: 'translateX(-50%)',
  textAlign: 'center',
  zIndex: 3,
  width: 'auto',
});

export const subTitle = style({
  color: '#000',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  letterSpacing: '2px',
});

export const mainTitle = style({
  color: '#000',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '60px',
  fontWeight: 700,
  lineHeight: 'normal',
  letterSpacing: '6px',
  marginTop: '18px',
});

export const beamBack = style({
  position: 'absolute',
  top: '45vh',
  left: '47%',
  transform: 'translate(-50%, -50%)',
  width: '35vw',
  maxWidth: '450px',
  flexShrink: 0,
  zIndex: 0,
});

export const beamFront = style({
  position: 'absolute',
  top: '55vh',
  left: '55%',
  transform: 'translate(-50%, -50%)',
  width: '30vw',
  maxWidth: '400px',
  flexShrink: 0,
  zIndex: 2,
});

export const cube = style({
  position: 'absolute',
  bottom: '12vh',
  right: '30vw',
  width: '10vw',
  minWidth: '350px',
  maxWidth: '350px',
  height: 'auto',
  zIndex: 3,
});