import { style } from '@vanilla-extract/css';
import { Z_INDEX } from './constants/zIndex';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';
import { MOBILE_MIN_MEDIA_QUERY } from '@/styles/mediaQuery';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: Z_INDEX.OVERLAY,
  overflow: 'hidden',
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

  selectors: {
    '&::before, &::after': {
      content: '',
      position: 'fixed',
      left: '50%',
      translate: '-50% 0',
      width: '420%',
      height: '500%',
      borderRadius: '50%',
      zIndex: 2,
      pointerEvents: 'none',
    },
    '&::before': { top: '-480%', background: 'linear-gradient(180deg, #000 0%, #05121F 100%)' },
    '&::after': { bottom: '-480%', background: 'linear-gradient(180deg, #14457A 0%, #185393 100%)' },
  },
});

export const closeButton = style({
  top: '1.2rem',
  left: '1.2rem',
  zIndex: Z_INDEX.CLOSE_BUTTON,
});

export const scrollContainer = style({
  width: '100vw',
  height: '100vh',
  overflowY: 'hidden',
  zIndex: Z_INDEX.SCROLL_CONTAINER,

  perspective: '1000px',

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const panoramaWrapper = style({
  position: 'absolute',
  left: 0,
  top: '50%',
  display: 'flex',
  width: 'calc(100vh * 10 / 9 * 3)',
  minWidth: '100vw',
  transform: 'translateY(-50%)',
  transformStyle: 'preserve-3d',
});

export const panoramaImage = style({
  width: 'calc(100vw / 3)',
  objectFit: 'cover',
  flexShrink: 0,
});

export const handPointer = style({
  position: 'fixed',
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  backgroundColor: 'lime',
  transform: 'translate(-50%, -50%)',
  zIndex: Z_INDEX.HAND_POINTER,
  pointerEvents: 'none',
});

export const interactionMessage = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: colors.color.blackDimmed,
  color: colors.color.white,
  padding: '2rem 3rem',
  borderRadius: '1rem',
  ...fonts.font.body_18_B,
  textAlign: 'center',
  zIndex: Z_INDEX.INTERACTION_MESSAGE,
});
