import { style } from '@vanilla-extract/css';

export const lanternImg = style({
  position: 'absolute',
  transition: 'all 0.2s ease',
  width: '100vw',
  height: '100vh',
});

export const lanternBox = style({
  position: 'absolute',
  borderRadius: 8,
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'orange',
});

export const handPointer = style({
  position: 'absolute',
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: 'lime',
  pointerEvents: 'none',
  zIndex: 100,
});
