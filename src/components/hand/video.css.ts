import { style } from '@vanilla-extract/css';

export const video = {
  container: style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    overflow: 'hidden',
  }),

  invisibleVideo: style({
    opacity: '0',
    pointerEvents: 'none',
    position: 'absolute',
    left: 0,
    top: 0,
  }),
};
