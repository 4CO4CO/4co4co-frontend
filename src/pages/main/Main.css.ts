import { style } from '@vanilla-extract/css';

export const mainContainer = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',
});