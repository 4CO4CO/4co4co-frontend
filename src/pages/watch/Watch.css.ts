import { keyframes, style } from '@vanilla-extract/css';
import { colors } from './../../styles/color.css';
import { fonts } from './../../styles/font.css';

export const container = style({
  width: '100vw',
  height: '100vh',
  background: colors.color.black,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  position: 'relative',
});

export const text = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  ...fonts.font.title_40_B,
  color: colors.color.white,
});

const pulseAnimation = keyframes({
  '0%': { transform: 'scale(0.3)', opacity: 0.5 },
  '50%': { transform: 'scale(1.2)', opacity: 0.8 },
  '100%': { transform: 'scale(1)', opacity: 0.5 },
});

export const visualizerCircle = style({
  width: '50%',
  height: 0,
  paddingBottom: '50%',
  borderRadius: '50%',
  backgroundColor: colors.color.sunsetGlow,
  opacity: 0.5,
  animation: `${pulseAnimation} 1s infinite`,
  transition: 'transform 0.1s ease-out',
});
