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

  '@media': {
    '(max-width: 798px)': {
      top: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
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

  '@media': {
    '(max-width: 798px)': {
      fontSize: '10px',
      marginBottom: '20px',
    },
  },
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

  '@media': {
    '(max-width: 798px)': {
      padding: '18px 12px',
      marginBottom: '10px',
    },
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

export const buttonContainer = style({
  display: 'flex',
  width: '311px',

  '@media': {
    '(max-width: 798px)': {
      gap: '10px',
      justifyContent: 'space-between',
    },
  },
});

export const cancelButton = style({
  width: '100px',
  height: '53px',
  flexShrink: 0,
  borderRadius: '10px',
  background: '#B9B9B9',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  zIndex: 5,
  position: 'relative',
  display: 'none',

  color: '#FFF',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',

  ':hover': {
    background: '#A0A0A0',
    transform: 'translateY(-1px)',
  },

  ':active': {
    transform: 'translateY(0)',
  },

  '@media': {
    '(max-width: 798px)': {
      display: 'block',
    },
  },
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

  '@media': {
    '(max-width: 798px)': {
      width: '205px',
      padding: '17px 12px',
    },
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

  '@media': {
    '(max-width: 798px)': {
      bottom: '-100px',
      left: '-60px',
      width: 'calc(100vw + 120px)',
      height: '40vh',
      borderRadius: '150px 150px 0 0',
    },
  },
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

// 왼쪽 섹션 (2개 - 0개)
export const leftLantern1 = style([clearLanternCustom, {
  width: '90px',
  height: '90px',
  top: '28px',
  left: '40px',
  vars: { '--base-rotation': '0deg' },
  animationDelay: '0s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '0px',
    },
  },
}]);

export const leftLantern2 = style([clearLanternCustom, {
  width: '48px',
  height: '67px',
  top: '184px',
  left: '63px',
  vars: { '--base-rotation': '0deg' },
  animationDelay: '1.5s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '0px',
    },
  },
}]);

// 오른쪽 섹션 (10개 - 9개)
export const rightLantern1 = style([clearLanternCustom, {
  width: '80px',
  height: '80px',
  top: '47px',
  right: '515px',
  vars: { '--base-rotation': '0deg' },
  animationDelay: '0s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '23px',
      height: '23px',
      top: '7px',
      left: '47px',
    },
  },
}]);

export const rightLantern2 = style([clearLanternCustom, {
  width: '25px',
  height: '24px',
  top: '78px',
  right: '434px',
  vars: { '--base-rotation': '0deg' },
  animationDelay: '1s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '15px',
      height: '15px',
      top: '19px',
      left: '98px',
    },
  },
}]);

export const rightLantern3 = style([clearLanternCustom, {
  width: '36px',
  height: '36px',
  top: '55px',
  right: '253px',
  vars: { '--base-rotation': '0deg' },
  animationDelay: '2s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '23px',
      height: '23px',
      top: '20px',
      right: '164px',
      vars: { '--base-rotation': '0deg' },
    },
  },
}]);

export const rightLantern4 = style([clearLanternCustom, {
  width: '43px',
  height: '53px',
  top: '119px',
  right: '306px',
  vars: { '--base-rotation': '20deg' },
  animationDelay: '3s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '27px',
      height: '33px',
      top: '45px',
      right: '195px',
      vars: { '--base-rotation': '20deg' },
    },
  },
}]);

export const rightLantern5 = style([clearLanternCustom, {
  width: '107px',
  height: '108px',
  top: '87px',
  right: '50px',
  vars: { '--base-rotation': '15deg' },
  animationDelay: '1.5s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '68px',
      height: '68px',
      top: '25px',
      right: '20px',
      vars: { '--base-rotation': '15deg' },
    },
  },
}]);

export const rightLantern6 = style([clearLanternCustom, {
  width: '77px',
  height: '76px',
  top: '157px',
  right: '584px',
  vars: { '--base-rotation': '8deg' },
  animationDelay: '2.5s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '49px',
      height: '48px',
      top: '70px',
      left: '3px',
    },
  },
}]);

export const rightLantern7 = style([clearLanternCustom, {
  width: '25px',
  height: '24px',
  top: '251px',
  right: '450px',
  vars: { '--base-rotation': '0deg' },
  animationDelay: '4s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '15px',
      height: '15px',
      top: '129px',
      left: '89px',
    },
  },
}]);

export const rightLantern8 = style([clearLanternCustom, {
  width: '64px',
  height: '65px',
  top: '252px',
  right: '324px',
  vars: { '--base-rotation': '12deg' },
  animationDelay: '0.5s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '40px',
      height: '40px',
      top: '130px',
      right: '206px',
    },
  },
}]);

export const rightLantern9 = style([clearLanternCustom, {
  width: '24px',
  height: '24px',
  top: '202px',
  right: '180px',
  vars: { '--base-rotation': '9deg' },
  animationDelay: '3.5s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '15px',
      height: '15px',
      top: '98px',
      right: '115px',
      vars: { '--base-rotation': '20deg' },
    },
  },
}]);

export const rightLantern10 = style([clearLanternCustom, {
  width: '66px',
  height: '66px',
  top: '334px',
  right: '100px',
  vars: { '--base-rotation': '20deg' },
  animationDelay: '2.8s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      display: 'none',
    },
  },
}]);

// 블러 섹션 (6개 - 9개)
export const blurLantern1 = style([floatingLanternCustom, {
  width: '90px',
  height: '88px',
  bottom: '160px',
  left: '105px',
  vars: { '--base-rotation': '15deg' },
  animationDelay: '0s',
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      width: '49px',
      height: '48px',
      bottom: '198px',
      left: '70px',
      display: 'block',
    },
  },
}]);

export const blurLantern2 = style([floatingLanternCustom, {
  width: '68px',
  height: '67px',
  bottom: '170px',
  right: '700px',
  vars: { '--base-rotation': '3deg' },
  animationDelay: '1s',
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      width: '40px',
      height: '40px',
      bottom: '200px',
      right: '220px',
    },
  },
}]);

export const blurLantern3 = style([floatingLanternCustom, {
  width: '22px',
  height: '22px',
  bottom: '260px',
  right: '600px',
  vars: { '--base-rotation': '12deg' },
  animationDelay: '2s',
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      width: '15px',
      height: '15px',
      bottom: '200px',
      right: '170px',
    },
  },
}]);

export const blurLantern4 = style([floatingLanternCustom, {
  width: '56px',
  height: '57px',
  bottom: '250px',
  right: '400px',
  vars: { '--base-rotation': '-6deg' },
  animationDelay: '3s',
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      width: '27px',
      height: '33px',
      bottom: '140px',
      right: '220px',
    },
  },
}]);

export const blurLantern5 = style([floatingLanternCustom, {
  width: '58px',
  height: '58px',
  bottom: '350px',
  right: '160px',
  vars: { '--base-rotation': '-15deg' },
  animationDelay: '1.5s',
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      width: '68px',
      height: '68px',
      bottom: '140px',
      right: '80px',
      vars: { '--base-rotation': '-5deg' },
    },
  },
}]);

export const blurLantern6 = style([floatingLanternCustom, {
  width: '21px',
  height: '22px',
  bottom: '200px',
  right: '260px',
  vars: { '--base-rotation': '-4deg' },
  animationDelay: '2.5s',
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      width: '23px',
      height: '23px',
      bottom: '110px',
      right: '180px',
    },
  },
}]);

// 모바일 전용 블러 풍등들
export const blurLantern7 = style([floatingLanternCustom, {
  width: '15px',
  height: '15px',
  bottom: '270px',
  left: '200px',
  vars: { '--base-rotation': '8deg' },
  animationDelay: '3.5s',
  zIndex: 2,
  display: 'block',

  '@media': {
    '(min-width: 799px)': {
      display: 'none',
    },
  },
}]);

export const blurLantern8 = style([floatingLanternCustom, {
  width: '23px',
  height: '23px',
  bottom: '100px',
  left: '140px',
  vars: { '--base-rotation': '10deg' },
  animationDelay: '4s',
  zIndex: 2,
  display: 'block',

  '@media': {
    '(min-width: 799px)': {
      display: 'none',
    },
  },
}]);

export const blurLantern9 = style([floatingLanternCustom, {
  width: '15px',
  height: '15px',
  bottom: '130px',
  left: '200px',
  vars: { '--base-rotation': '10deg' },
  animationDelay: '4.5s',
  zIndex: 2,
  display: 'block',

  '@media': {
    '(min-width: 799px)': {
      display: 'none',
    },
  },
}]);