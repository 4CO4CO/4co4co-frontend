import { style, keyframes } from '@vanilla-extract/css';

const floatBlurCustom = keyframes({
  '0%, 100%': {
    transform: 'translateY(0px) rotate(calc(-180deg + var(--base-rotation, 0deg)))',
  },
  '50%': {
    transform: 'translateY(-20px) rotate(calc(-175deg + var(--base-rotation, 0deg)))',
  },
});

const floatClearCustom = keyframes({
  '0%, 100%': {
    transform: 'translateY(0px) rotate(var(--base-rotation, 0deg))',
  },
  '50%': {
    transform: 'translateY(-15px) rotate(calc(var(--base-rotation, 0deg) - 5deg))',
  },
});

export const container = style({
  position: 'relative',
  width: '100vw',
  height: '100dvh',
  backgroundColor: '#f9f6ef',
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

export const contentWrapper = style({
  position: 'absolute',
  top: '40px',
  left: '170px',
  zIndex: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
});

export const mainTitle = style({
  color: '#000',
  fontFamily: 'Pretendard',
  fontSize: '28px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
  letterSpacing: '2.8px',
  marginBottom: '10px',
  whiteSpace: 'pre-line',
});

export const subTitle = style({
  color: '#626262',
  fontFamily: 'Pretendard',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
  marginBottom: '30px',
  whiteSpace: 'pre-line',
});

export const inputField = style({
  width: '311px',
  height: '53px',
  flexShrink: 0,
  borderRadius: '7px',
  background: '#FFF',
  border: 'none',
  padding: '0 20px',
  marginBottom: '15px',
  fontSize: '15px',
  fontFamily: 'Pretendard',
  fontWeight: 500,
  outline: 'none',
  boxSizing: 'border-box',
  zIndex: 5,
  position: 'relative',

  '::placeholder': {
    color: '#999',
    fontFamily: 'Pretendard',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
  },
});

export const errorMessage = style({
  color: '#ff4444',
  fontSize: '14px',
  fontFamily: 'Pretendard',
  fontWeight: 500,
  marginBottom: '10px',
  minHeight: '20px',
  lineHeight: '1.4',
});

export const enterButton = style({
  width: '311px',
  height: '53px',
  flexShrink: 0,
  borderRadius: '10px',
  background: '#FCBC42',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  zIndex: 5,
  position: 'relative',

  color: '#000',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',

  ':hover': {
    background: '#E5A63A',
    transform: 'translateY(-1px)',
  },

  ':active': {
    transform: 'translateY(0)',
  },
});

export const backgroundGradient = style({
  position: 'absolute',
  bottom: '-150px',
  left: '-50px',
  width: 'calc(100vw + 100px)',
  height: '55vh',
  borderRadius: '200px 200px 0 0',
  background: `
    linear-gradient(0deg, rgba(0, 85, 223, 0.30) 0%, rgba(0, 85, 223, 0.30) 100%), 
    linear-gradient(177deg, #FBBD2A 8.35%, #000 84.48%)
  `,
  zIndex: 1,
  overflow: 'visible',
});

export const lanternContainer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
  overflow: 'visible',
});

export const backgroundLanternContainer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
});

// 공통 애니메이션 스타일
export const floatingLanternCustom = style({
  position: 'absolute',
  filter: 'blur(5px)',
  animation: `${floatBlurCustom} 6s ease-in-out infinite`,
  opacity: 0.8,
});

export const clearLanternCustom = style({
  position: 'absolute',
  animation: `${floatClearCustom} 8s ease-in-out infinite`,
});

// 왼쪽 섹션 (2개)
export const leftLantern1 = style([clearLanternCustom, {
  width: '90px',
  height: '90px',
  top: '28px',
  left: '40px',
  vars: { '--base-rotation': '0deg' },
  animationDelay: '0s',
  zIndex: 3,
}]);

export const leftLantern2 = style([clearLanternCustom, {
  width: '48px',
  height: '67px',
  top: '184px',
  left: '63px',
  vars: { '--base-rotation': '0deg' },
  animationDelay: '1.5s',
  zIndex: 3,
}]);

// 오른쪽 섹션 (10개) - 각각 다른 기본 각도
export const rightLantern1 = style([clearLanternCustom, {
  width: '36px',
  height: '36px',
  top: '47px',
  right: '515px',
  vars: { '--base-rotation': '0deg' },
  animationDelay: '0s',
  zIndex: 3,
}]);

export const rightLantern2 = style([clearLanternCustom, {
  width: '25px',
  height: '24px',
  top: '78px',
  right: '434px',
  vars: { '--base-rotation': '0deg' },
  animationDelay: '1s',
  zIndex: 3,
}]);

export const rightLantern3 = style([clearLanternCustom, {
  width: '36px',
  height: '36px',
  top: '55px',
  right: '253px',
  vars: { '--base-rotation': '0deg' },
  animationDelay: '2s',
  zIndex: 3,
}]);

export const rightLantern4 = style([clearLanternCustom, {
  width: '43px',
  height: '53px',
  top: '119px',
  right: '306px',
  vars: { '--base-rotation': '20deg' },
  animationDelay: '3s',
  zIndex: 3,
}]);

export const rightLantern5 = style([clearLanternCustom, {
  width: '107px',
  height: '108px',
  top: '87px',
  right: '50px',
  vars: { '--base-rotation': '15deg' },
  animationDelay: '1.5s',
  zIndex: 3,
}]);

export const rightLantern6 = style([clearLanternCustom, {
  width: '77px',
  height: '76px',
  top: '157px',
  right: '584px',
  vars: { '--base-rotation': '8deg' },
  animationDelay: '2.5s',
  zIndex: 3,
}]);

export const rightLantern7 = style([clearLanternCustom, {
  width: '25px',
  height: '24px',
  top: '251px',
  right: '450px',
  vars: { '--base-rotation': '0deg' },
  animationDelay: '4s',
  zIndex: 3,
}]);

export const rightLantern8 = style([clearLanternCustom, {
  width: '64px',
  height: '65px',
  top: '252px',
  right: '324px',
  vars: { '--base-rotation': '12deg' },
  animationDelay: '0.5s',
  zIndex: 3,
}]);

export const rightLantern9 = style([clearLanternCustom, {
  width: '24px',
  height: '24px',
  top: '202px',
  right: '180px',
  vars: { '--base-rotation': '9deg' },
  animationDelay: '3.5s',
  zIndex: 3,
}]);

export const rightLantern10 = style([clearLanternCustom, {
  width: '66px',
  height: '66px',
  top: '334px',
  right: '100px',
  vars: { '--base-rotation': '20deg' },
  animationDelay: '2.8s',
  zIndex: 3,
}]);

// 블러 섹션 (6개)
export const blurLantern1 = style([floatingLanternCustom, {
  width: '90px',
  height: '88px',
  bottom: '35%',
  left: '8%',
  vars: { '--base-rotation': '5deg' },
  animationDelay: '0s',
}]);

export const blurLantern2 = style([floatingLanternCustom, {
  width: '68px',
  height: '67px',
  bottom: '33%',
  left: '55%',
  vars: { '--base-rotation': '3deg' },
  animationDelay: '1s',
}]);

export const blurLantern3 = style([floatingLanternCustom, {
  width: '22px',
  height: '22px',
  bottom: '50%',
  left: '63%',
  vars: { '--base-rotation': '12deg' },
  animationDelay: '2s',
}]);

export const blurLantern4 = style([floatingLanternCustom, {
  width: '56px',
  height: '57px',
  bottom: '50%',
  left: '72%',
  vars: { '--base-rotation': '-6deg' },
  animationDelay: '3s',
}]);

export const blurLantern5 = style([floatingLanternCustom, {
  width: '58px',
  height: '58px',
  bottom: '60%',
  right: '8%',
  vars: { '--base-rotation': '-15deg' },
  animationDelay: '1.5s',
}]);

export const blurLantern6 = style([floatingLanternCustom, {
  width: '21px',
  height: '22px',
  bottom: '40%',
  right: '15%',
  vars: { '--base-rotation': '-4deg' },
  animationDelay: '2.5s',
}]);