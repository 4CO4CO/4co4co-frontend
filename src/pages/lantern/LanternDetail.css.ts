import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'black',
  zIndex: 999,
});

export const fullImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const closeButton = style({
  position: 'absolute',
  top: 20,
  left: 20,
  zIndex: 1000,
  width: 100,
  height: 100,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: 'none',
  borderRadius: 4,
  padding: '8px 12px',
  fontSize: 16,
  cursor: 'pointer',
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
