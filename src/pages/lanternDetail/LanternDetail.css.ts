import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'black',
  zIndex: 999,
  overflow: 'hidden',
});

export const scrollContainer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  overflowX: 'scroll',
  overflowY: 'hidden',
  zIndex: 1000,
  '::-webkit-scrollbar': {
    height: '8px',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: '#333',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
  },
});

export const panoramaWrapper = style({
  display: 'flex',
  width: '300vw',
  height: '100vh',
});

export const panoramaImage = style({
  width: '100vw',
  height: '100vh',
  objectFit: 'cover',
  flexShrink: 0,
});

export const handPointer = style({
  position: 'fixed',
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: 'lime',
  transform: 'translate(-50%, -50%)',
  zIndex: 2000,
  pointerEvents: 'none',
});

export const interactionMessage = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  padding: '20px 30px',
  borderRadius: '10px',
  fontSize: '18px',
  textAlign: 'center',
  zIndex: 3000,
});