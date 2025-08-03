import { style, globalStyle } from '@vanilla-extract/css';
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
  width: '70%',
});

export const customReactCrop = style({
  position: 'relative',
  width: '70%',
});

export const originImage = style({
  width: '100%',
  height: 'auto',
});

globalStyle(`${customReactCrop} .ReactCrop__drag-handle`, {
  width: '1rem',
  height: '1rem',
  backgroundColor: colors.color.sunsetGlow,
  border: 'none',
});
