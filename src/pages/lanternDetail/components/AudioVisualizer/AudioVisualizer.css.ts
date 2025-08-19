import { style } from '@vanilla-extract/css';
// import { Z_INDEX } from '../../constants/zIndex';

// const glow = keyframes({
//   '0%, 100%': { boxShadow: '0 0 5px rgba(96, 165, 250, 0.3)' },
//   '50%': { boxShadow: '0 0 20px rgba(96, 165, 250, 0.6)' },
// });

export const container = style({
  position: 'fixed',
  bottom: '2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  borderRadius: '12px',
  backdropFilter: 'blur(15px)',
  zIndex: 1000,
  minWidth: '160px',
});

export const trackInfo = style({
  color: '#ffffff',
  fontSize: '12px',
  fontFamily: 'monospace',
  marginBottom: '8px',
  textAlign: 'center',
  fontWeight: '600',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
});

export const visualizer = style({
  position: 'relative',
  width: '100%',
  zIndex: 1000,
  margin: 0,
});

export const canvas = style({
  width: '50vw',
  height: '10rem',
  display: 'block',
});

export const placeholder = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '10px',
  color: 'rgba(255, 255, 255, 0.7)',
  fontFamily: 'monospace',
  fontWeight: '500',
});
