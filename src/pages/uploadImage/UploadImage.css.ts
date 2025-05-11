import { style } from '@vanilla-extract/css';

export const image_container = style({
  width: 400,
  height: (400 * 9) / 16,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: 8,
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const button_container = style({
  position: 'relative',
  background: 'black',
  color: 'white',
  height: 'inherit',
  width: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const file_input = style({
  position: 'absolute',
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
});

export const text_input = style({
  width: 400,
  padding: 14,
  boxSizing: 'border-box',
  borderRadius: 8,
});
