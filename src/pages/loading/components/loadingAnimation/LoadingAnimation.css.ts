import { style, keyframes } from '@vanilla-extract/css';

const CYCLE_DURATION = '16s';

// 산 움직임
const mountainCycle = keyframes({
  // 올라가기
  '0%': {
    fill: '#D9E9C6',
    transform: 'translateY(-10px)'
  },
  '18%': {
    fill: '#405D1D',
    transform: 'translateY(-40px)'
  },

  // 정지
  '40%': {
    fill: '#405D1D',
    transform: 'translateY(-40px)'
  },

  // 내려가기
  '46%': {
    fill: '#D9E9C6',
    transform: 'translateY(-10px)'
  },

  // 정지
  '65%': {
    fill: '#D9E9C6',
    transform: 'translateY(-10px)'
  },

  // 올라가기
  '73%': {
    fill: '#405D1D',
    transform: 'translateY(-40px)'
  },

  // 정지
  '88%': {
    fill: '#405D1D',
    transform: 'translateY(-40px)'
  },

  // 내려가기
  '100%': {
    fill: '#D9E9C6',
    transform: 'translateY(-10px)'
  }
});

// 해 움직임
const sunCycle = keyframes({
  // 숨김
  '0%': {
    transform: 'translate(-20px, 40px)',
    opacity: '0'
  },
  '16%': {
    transform: 'translate(-20px, 40px)',
    opacity: '0'
  },

  // 떠오르기
  '25%': {
    transform: 'translate(30px, -10px)',
    opacity: '1'
  },

  // 정지
  '33%': {
    transform: 'translate(30px, -10px)',
    opacity: '1'
  },

  // 내려가기
  '40%': {
    transform: 'translate(80px, 40px)',
    opacity: '0'
  },

  // 숨김
  '100%': {
    transform: 'translate(-40px, 40px)',
    opacity: '0'
  }
});

// 달 움직임
const moonCycle = keyframes({
  // 숨김
  '0%': {
    transform: 'translate(0px, 30px)',
    opacity: '0'
  },
  '71%': {
    transform: 'translate(0px, 30px)',
    opacity: '0'
  },

  // 떠오르기
  '80%': {
    transform: 'translate(70px, -10px)',
    opacity: '1'
  },

  // 정지
  '83%': {
    transform: 'translate(70px, -10px)',
    opacity: '1'
  },

  // 내려가기
  '88%': {
    transform: 'translate(140px, 30px)',
    opacity: '0'
  },

  // 숨김
  '100%': {
    transform: 'translate(0px, 30px)',
    opacity: '0'
  }
});

export const container = style({
  width: '170px',
  height: '170px',
  backgroundColor: 'white',
  borderRadius: '10px',
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