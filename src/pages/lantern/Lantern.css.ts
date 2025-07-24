import { keyframes, style } from '@vanilla-extract/css';
import { clearLanternCustom } from '../entry/Entry.css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

export const container = style({
  width: '100vw',
  height: '100vh',
  background: 'linear-gradient(180deg, #000 0%, #185393 100%)',
});

export const lanternBox = style({
  position: 'absolute',
  borderRadius: 8,
  transition: 'all 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const lanternImg = style([
  clearLanternCustom,
  {
    position: 'relative',
  },
]);

export const lanternName = style({
  ...fonts.font.body_10_B,
  color: colors.color.white,
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

export const fadeInUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(50px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});
