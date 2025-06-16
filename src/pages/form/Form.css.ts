import { style } from '@vanilla-extract/css';

export const upload_wrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '90px 155px',
});

export const title = style({
  fontSize: '28px',
});

export const text = style({
  fontSize: '18px',
  color: '#626262',
});

export const image_container = style({
  width: 400,
  height: (400 * 9) / 16,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: 8,
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const image = style({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  objectPosition: 'center',
});

export const button_container = style({
  position: 'relative',
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

export const buttonStyle = style({
  fontSize: '16px',
  background: '#FCBC42',
  width: '311px',
  height: '53px',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  marginLeft: '20px',
});
