import { style } from '@vanilla-extract/css';

export const toast = style({
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '12px 24px',
  borderRadius: '8px',
  color: 'white',
  fontSize: '14px',
  fontWeight: 500,
  zIndex: 9999,
  minWidth: '200px',
  textAlign: 'center',
});

export const success = style({
  backgroundColor: '#10B981',
});

export const error = style({
  backgroundColor: '#EF4444',
});

export const info = style({
  backgroundColor: '#3B82F6',
});