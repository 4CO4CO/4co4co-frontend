import { style, keyframes } from '@vanilla-extract/css';

const glow = keyframes({
  '0%, 100%': { boxShadow: '0 0 5px rgba(96, 165, 250, 0.3)' },
  '50%': { boxShadow: '0 0 20px rgba(96, 165, 250, 0.6)' }
});

export const container = style({
  position: 'fixed',
  top: '12px',
  left: '120px',
  background: 'rgba(0, 0, 0, 0.9)',
  borderRadius: '12px',
  padding: '10px 16px',
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(96, 165, 250, 0.1)',
  zIndex: 1000,
  minWidth: '160px',
  animation: `${glow} 3s infinite ease-in-out`,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
});

export const trackInfo = style({
  color: '#ffffff',
  fontSize: '12px',
  fontFamily: 'monospace',
  marginBottom: '8px',
  textAlign: 'center',
  fontWeight: '600',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
});

export const visualizer = style({
  position: 'relative',
  height: '40px',
  background: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '6px',
  overflow: 'hidden',
  border: '1px solid rgba(96, 165, 250, 0.2)'
});

export const canvas = style({
  width: '100%',
  height: '100%',
  display: 'block'
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
  fontWeight: '500'
});