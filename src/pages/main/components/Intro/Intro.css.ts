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
});

export const beamBack = style({
  position: 'absolute',
  top: '45vh',
  left: '47%',
  transform: 'translate(-50%, -50%)',
  width: '450px',
  flexShrink: 0,
  zIndex: 0,

  '@media': {
    '(max-width: 798px)': {
      top: '40vh',
      width: '330px',
    },
  },
});

export const beamFront = style({
  position: 'absolute',
  top: '55vh',
  left: '55%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  flexShrink: 0,
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      top: '47vh',
      left: '57%',
      width: '280px',
    },
  },
});

export const cube = style({
  position: 'absolute',
  top: '48vh',
  left: '50%',
  width: '20vw',
  minWidth: '350px',
  height: 'auto',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      transform: 'translateX(-10%) translateY(-2vh)',
      minWidth: '250px',
      top: '45vh',
      left: '55%',
    },

    '(max-width: 425px)': {
      transform: 'translateX(-10%) translateY(-2vh)',
      minWidth: '200px',
      top: '48vh',
      left: '50%',
    },
  },
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

  '@media': {
    '(max-width: 798px)': {
      fontSize: '12px',
    },
  },
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

  '@media': {
    '(max-width: 798px)': {
      fontSize: '40px',
    },
  },
});
