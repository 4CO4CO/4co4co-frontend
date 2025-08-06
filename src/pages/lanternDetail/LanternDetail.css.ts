import { style } from '@vanilla-extract/css';
import { Z_INDEX } from './constants/zIndex';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: colors.color.black,
  zIndex: Z_INDEX.OVERLAY,
  overflow: 'hidden',
});

export const closeButton = style({
  top: '1.2rem',
  left: '1.2rem',
  zIndex: Z_INDEX.CLOSE_BUTTON,
});

export const scrollContainer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  overflowX: 'scroll',
  overflowY: 'hidden',
  zIndex: Z_INDEX.SCROLL_CONTAINER,

  selectors: {
    '&::-webkit-scrollbar': {
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#333',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '4px',
    },
  },
});

export const panoramaWrapper = style({
  display: 'flex',
  height: '100vh',
  backgroundColor: colors.color.black,
  width: 'calc(100vh * 10 / 9 * 3)',
  minWidth: '100vw',
});

export const panoramaImage = style({
  height: '100vh',
  width: 'calc(100vh * 10 / 9)',
  objectFit: 'cover',
  flexShrink: 0,
  backgroundColor: colors.color.black,
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