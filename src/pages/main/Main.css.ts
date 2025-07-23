import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';

export const mainContainer = style({
  height: '100dvh',
  overflowY: 'scroll',
  scrollSnapType: 'y mandatory',
  backgroundColor: colors.color.white200,
  position: 'fixed',
  top: 0,
  left: 0,
});

export const section = style({
  scrollSnapAlign: 'start',
  height: '100vh',
});