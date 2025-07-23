import { style, keyframes } from '@vanilla-extract/css';

const CYCLE_DURATION = '16s';

// 산 움직임
const mountainCycle = keyframes({
  // 올라가기
  '0%': {
    fill: '#D9E9C6',
    transform: 'translateY(-1rem)'
  },
  '18%': {
    fill: '#405D1D',
    transform: 'translateY(-4rem)'
  },

  // 정지
  '40%': {
    fill: '#405D1D',
    transform: 'translateY(-4rem)'
  },

  // 내려가기
  '46%': {
    fill: '#D9E9C6',
    transform: 'translateY(-1rem)'
  },

  // 정지
  '65%': {
    fill: '#D9E9C6',
    transform: 'translateY(-1rem)'
  },

  // 올라가기
  '73%': {
    fill: '#405D1D',
    transform: 'translateY(-4rem)'
  },

  // 정지
  '88%': {
    fill: '#405D1D',
    transform: 'translateY(-4rem)'
  },

  // 내려가기
  '100%': {
    fill: '#D9E9C6',
    transform: 'translateY(-1rem)'
  }
});

// 해 움직임
const sunCycle = keyframes({
  // 숨김
  '0%': {
    transform: 'translate(-2rem, 4rem)',
    opacity: '0'
  },
  '16%': {
    transform: 'translate(-2rem, 4rem)',
    opacity: '0'
  },

  // 떠오르기
  '25%': {
    transform: 'translate(3rem, -1rem)',
    opacity: '1'
  },

  // 정지
  '33%': {
    transform: 'translate(3rem, -1rem)',
    opacity: '1'
  },

  // 내려가기
  '40%': {
    transform: 'translate(8rem, 4rem)',
    opacity: '0'
  },

  // 숨김
  '100%': {
    transform: 'translate(-4rem, 4rem)',
    opacity: '0'
  }
});

// 달 움직임
const moonCycle = keyframes({
  // 숨김
  '0%': {
    transform: 'translate(0rem, 3rem)',
    opacity: '0'
  },
  '71%': {
    transform: 'translate(0rem, 3rem)',
    opacity: '0'
  },

  // 떠오르기
  '80%': {
    transform: 'translate(7rem, -1rem)',
    opacity: '1'
  },

  // 정지
  '83%': {
    transform: 'translate(7rem, -1rem)',
    opacity: '1'
  },

  // 내려가기
  '88%': {
    transform: 'translate(14rem, 3rem)',
    opacity: '0'
  },

  // 숨김
  '100%': {
    transform: 'translate(0rem, 3rem)',
    opacity: '0'
  }
});

export const container = style({
  width: '17rem',
  height: '17rem',
  backgroundColor: 'white',
  borderRadius: '1rem',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
});

export const svg = style({
  width: '100%',
  height: '100%',
});

export const mountainGroup = style({
  animation: `${mountainCycle} ${CYCLE_DURATION} cubic-bezier(0.33, 0, 0.67, 1) infinite`,
  transformOrigin: 'center bottom',
});

export const sun = style({
  fill: 'url(#sunGradient)',
  animation: `${sunCycle} ${CYCLE_DURATION} cubic-bezier(0.33, 0, 0.67, 1) infinite`,
  transformOrigin: 'center center',
});

export const moon = style({
  fill: 'url(#moonGradient)',
  animation: `${moonCycle} ${CYCLE_DURATION} cubic-bezier(0.33, 0, 0.67, 1) infinite`,
  transformOrigin: 'center center',
});