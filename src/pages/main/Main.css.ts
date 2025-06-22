import { style } from '@vanilla-extract/css';

export const mainContainer = style({
  height: '100vh',
  overflowY: 'scroll',
  scrollSnapType: 'y mandatory',
  backgroundColor: '#f9f6ef',
  position: 'fixed',
  top: 0,
  left: 0,
});

export const section = style({
  scrollSnapAlign: 'start',
  height: '100vh',
});