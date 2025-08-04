import { style, globalStyle, styleVariants } from '@vanilla-extract/css';
import { Z_INDEX } from '@/pages/lanternDetail/constants/zIndex';
import { colors } from '@/styles/color.css';

export const modalContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  zIndex: Z_INDEX.SCROLL_CONTAINER,
  gap: '2rem',
  backgroundColor: colors.color.blackDimmed,
  inset: 0,
});

globalStyle(`${modalContainer} button`, {
  width: '30rem',
});

export const customReactCropVariants = styleVariants({
  landscape: {
    maxWidth: '70vw',
    height: 'auto',
  },
  portrait: {
    width: 'auto',
    maxHeight: '70vh',
  },
});

export const customReactCrop = style({
  position: 'relative',
  display: 'block',
});

export const originImage = style({
  width: '100%',
  height: 'auto',
});

globalStyle(`${customReactCrop} .ReactCrop__drag-handle`, {
  width: '1.5rem',
  height: '1.5rem',
  backgroundColor: colors.color.sunsetGlow,
  border: 'none',
});
