import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';

export const toggleContainer = style({
  width: '4rem',
  height: '2rem',
  borderRadius: '10px',
  backgroundColor: colors.color.gray100,
  position: 'relative',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
});

export const toggleContainerOn = style({
  backgroundColor: colors.color.goldenMemories,
});

export const toggleCircle = style({
  position: 'absolute',
  top: '0.1rem',
  left: '0.1rem',
  width: '1.8rem',
  height: '1.8rem',
  borderRadius: '50%',
  backgroundColor: colors.color.white,
  transition: 'transform 0.2s',
});

export const toggleCircleOn = style({
  transform: 'translateX(2rem)',
});
