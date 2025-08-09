import { keyframes, style } from '@vanilla-extract/css';
import { clearLanternCustom } from '../entry/Entry.css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';
import { MOBILE_MIN_MEDIA_QUERY } from '@/styles/mediaQuery';

export const container = style({
  width: '100vw',
  height: '100vh',
  background: 'linear-gradient(180deg, #000 0%, #185393 100%)',

  '@media': {
    [MOBILE_MIN_MEDIA_QUERY]: {
      transform: 'rotate(90deg)',
      transformOrigin: 'center center',
      width: '100vh',
      height: '100vw',
      position: 'fixed',
      top: 'calc((100vh - 100vw) / 2)',
      left: 'calc((100vw - 100vh) / 2)',
    },
  },
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
    transform: 'translateY(5rem)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const neonBlink = keyframes({
  '0%, 100%': {
    filter:
      'drop-shadow(0 0 0.5rem rgba(233, 210, 119, 0.8)) ' +
      'drop-shadow(0 0 1rem rgba(255, 204, 0, 0.7)) ' +
      'drop-shadow(0 0 3rem rgba(255, 204, 0, 0.6)) ' +
      'drop-shadow(0 0 5rem rgba(255, 204, 0, 0.4))',
  },
  '50%': {
    filter:
      'drop-shadow(0 0 0.2rem rgba(254, 244, 226, 0.6)) ' +
      'drop-shadow(0 0 1rem rgba(255, 204, 0, 0.5)) ' +
      'drop-shadow(0 0 2rem rgba(255, 204, 0, 0.4)) ' +
      'drop-shadow(0 0 4rem rgba(255, 204, 0, 0.3))',
  },
});
