import { style, keyframes } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

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
  backgroundColor: colors.color.white200,
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

export const contentWrapper = style({
  position: 'absolute',
  top: '4rem',
  left: '17rem',
  zIndex: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',

  '@media': {
    '(max-width: 798px)': {
      top: '4rem',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
});

export const mainTitle = style({
  color: colors.color.black,
  ...fonts.font.title_28_B,
  lineHeight: 'normal',
  marginBottom: '2rem',
  whiteSpace: 'pre-line',
});

export const subTitle = style({
  color: colors.color.gray300,
  ...fonts.font.body_18_B,
  lineHeight: 'normal',
  marginBottom: '3rem',
  whiteSpace: 'pre-line',

  '@media': {
    '(max-width: 798px)': {
      ...fonts.font.body_10_R,
      marginBottom: '2rem',
    },
  },
});

export const inputField = style({
  width: '30rem',
  marginBottom: '1.5rem',
  zIndex: 5,
  position: 'relative',

  '@media': {
    '(max-width: 798px)': {
      marginBottom: '1rem',
    },
  },
});

export const errorMessage = style({
  color: colors.color.dangerous,
  ...fonts.font.body_14_B,
  fontWeight: 500,
  marginBottom: '1rem',
  minHeight: '2rem',
  lineHeight: '1.4',
  width: '30rem',
});

export const buttonContainer = style({
  display: 'flex',
  width: '30rem',

  '@media': {
    '(max-width: 798px)': {
      gap: '1rem',
      justifyContent: 'space-between',
    },
  },
});

export const cancelButton = style({
  width: '10rem',
});

export const enterButton = style({
  width: '30rem',

  '@media': {
    '(max-width: 798px)': {
      padding: '1.7rem 1.2rem',
    },
  },
});

export const backgroundGradient = style({
  position: 'absolute',
  bottom: '-15rem',
  left: '-5rem',
  width: 'calc(100vw + 10rem)',
  height: '55vh',
  borderRadius: '20rem 20rem 0 0',
  background: `
    linear-gradient(0deg, rgba(0, 85, 223, 0.30) 0%, rgba(0, 85, 223, 0.30) 100%), 
    linear-gradient(177deg, #FBBD2A 8.35%, #000 84.48%)
  `,
  zIndex: 1,
  overflow: 'visible',

  '@media': {
    '(max-width: 798px)': {
      bottom: '-10rem',
      left: '-6rem',
      width: 'calc(100vw + 12rem)',
      height: '40vh',
      borderRadius: '15rem 15rem 0 0',
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
  width: '9rem',
  height: '9rem',
  top: '2.8rem',
  left: '4rem',
  vars: { '--base-rotation': '0deg' },
  transform: 'rotate(0deg)',
  animationDelay: '0s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '0rem',
    },
  },
}]);

export const leftLantern2 = style([clearLanternCustom, {
  width: '4.8rem',
  height: '6.7rem',
  top: '18.4rem',
  left: '6.3rem',
  vars: { '--base-rotation': '0deg' },
  transform: 'rotate(0deg)',
  animationDelay: '1.5s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '0rem',
    },
  },
}]);

// 오른쪽 섹션 (10개 - 9개)
export const rightLantern1 = style([clearLanternCustom, {
  width: '8rem',
  height: '8rem',
  top: '4.7rem',
  right: '51.5rem',
  vars: { '--base-rotation': '0deg' },
  transform: 'rotate(0deg)',
  animationDelay: '0s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '2.3rem',
      height: '2.3rem',
      top: '0.7rem',
      left: '4.7rem',
    },
  },
}]);

export const rightLantern2 = style([clearLanternCustom, {
  width: '2.5rem',
  height: '2.4rem',
  top: '7.8rem',
  right: '43.4rem',
  vars: { '--base-rotation': '0deg' },
  transform: 'rotate(0deg)',
  animationDelay: '1s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '1.5rem',
      height: '1.5rem',
      top: '1.9rem',
      left: '9.8rem',
    },
  },
}]);

export const rightLantern3 = style([clearLanternCustom, {
  width: '3.6rem',
  height: '3.6rem',
  top: '5.5rem',
  right: '25.3rem',
  vars: { '--base-rotation': '0deg' },
  transform: 'rotate(0deg)',
  animationDelay: '2s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '2.3rem',
      height: '2.3rem',
      top: '2rem',
      right: '16.4rem',
      vars: { '--base-rotation': '0deg' },
    },
  },
}]);

export const rightLantern4 = style([clearLanternCustom, {
  width: '4.3rem',
  height: '5.3rem',
  top: '11.9rem',
  right: '30.6rem',
  vars: { '--base-rotation': '20deg' },
  transform: 'rotate(20deg)',
  animationDelay: '3s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '2.7rem',
      height: '3.3rem',
      top: '4.5rem',
      right: '19.5rem',
      vars: { '--base-rotation': '20deg' },
    },
  },
}]);

export const rightLantern5 = style([clearLanternCustom, {
  width: '10.7rem',
  height: '10.8rem',
  top: '8.7rem',
  right: '5rem',
  vars: { '--base-rotation': '15deg' },
  transform: 'rotate(15deg)',
  animationDelay: '1.5s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '6.8rem',
      height: '6.8rem',
      top: '2.5rem',
      right: '2rem',
      vars: { '--base-rotation': '15deg' },
    },
  },
}]);

export const rightLantern6 = style([clearLanternCustom, {
  width: '7.7rem',
  height: '7.6rem',
  top: '15.7rem',
  right: '58.4rem',
  vars: { '--base-rotation': '8deg' },
  transform: 'rotate(8deg)',
  animationDelay: '2.5s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '4.9rem',
      height: '4.8rem',
      top: '7rem',
      left: '0.3rem',
    },
  },
}]);

export const rightLantern7 = style([clearLanternCustom, {
  width: '2.5rem',
  height: '2.4rem',
  top: '25.1rem',
  right: '45rem',
  vars: { '--base-rotation': '0deg' },
  transform: 'rotate(0deg)',
  animationDelay: '4s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '1.5rem',
      height: '1.5rem',
      top: '12.9rem',
      left: '8.9rem',
    },
  },
}]);

export const rightLantern8 = style([clearLanternCustom, {
  width: '6.4rem',
  height: '6.5rem',
  top: '25.2rem',
  right: '32.4rem',
  vars: { '--base-rotation': '12deg' },
  transform: 'rotate(12deg)',
  animationDelay: '0.5s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '4rem',
      height: '4rem',
      top: '13rem',
      right: '20.6rem',
    },
  },
}]);

export const rightLantern9 = style([clearLanternCustom, {
  width: '2.4rem',
  height: '2.4rem',
  top: '20.2rem',
  right: '18rem',
  vars: { '--base-rotation': '9deg' },
  transform: 'rotate(9deg)',
  animationDelay: '3.5s',
  zIndex: 3,

  '@media': {
    '(max-width: 798px)': {
      width: '1.5rem',
      height: '1.5rem',
      top: '9.8rem',
      right: '11.5rem',
      vars: { '--base-rotation': '20deg' },
    },
  },
}]);

export const rightLantern10 = style([clearLanternCustom, {
  width: '6.6rem',
  height: '6.6rem',
  top: '33.4rem',
  right: '10rem',
  vars: { '--base-rotation': '20deg' },
  transform: 'rotate(20deg)',
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
  width: '9rem',
  height: '8.8rem',
  bottom: '16rem',
  left: '10.5rem',
  vars: { '--base-rotation': '15deg' },
  transform: 'rotate(-165deg)',
  animationDelay: '0s',
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      width: '4.9rem',
      height: '4.8rem',
      bottom: '19.8rem',
      left: '7rem',
      display: 'block',
    },
  },
}]);

export const blurLantern2 = style([floatingLanternCustom, {
  width: '6.8rem',
  height: '6.7rem',
  bottom: '17rem',
  right: '70rem',
  vars: { '--base-rotation': '3deg' },
  transform: 'rotate(-177deg)',
  animationDelay: '1s',
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      width: '4rem',
      height: '4rem',
      bottom: '20rem',
      right: '22rem',
    },
  },
}]);

export const blurLantern3 = style([floatingLanternCustom, {
  width: '2.2rem',
  height: '2.2rem',
  bottom: '26rem',
  right: '60rem',
  vars: { '--base-rotation': '12deg' },
  transform: 'rotate(-168deg)',
  animationDelay: '2s',
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      width: '1.5rem',
      height: '1.5rem',
      bottom: '20rem',
      right: '17rem',
    },
  },
}]);

export const blurLantern4 = style([floatingLanternCustom, {
  width: '5.6rem',
  height: '5.7rem',
  bottom: '25rem',
  right: '40rem',
  vars: { '--base-rotation': '-6deg' },
  transform: 'rotate(-186deg)',
  animationDelay: '3s',
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      width: '2.7rem',
      height: '3.3rem',
      bottom: '14rem',
      right: '22rem',
    },
  },
}]);

export const blurLantern5 = style([floatingLanternCustom, {
  width: '5.8rem',
  height: '5.8rem',
  bottom: '35rem',
  right: '16rem',
  vars: { '--base-rotation': '-15deg' },
  transform: 'rotate(-195deg)',
  animationDelay: '1.5s',
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      width: '6.8rem',
      height: '6.8rem',
      bottom: '14rem',
      right: '8rem',
      vars: { '--base-rotation': '-5deg' },
    },
  },
}]);

export const blurLantern6 = style([floatingLanternCustom, {
  width: '2.1rem',
  height: '2.2rem',
  bottom: '20rem',
  right: '26rem',
  vars: { '--base-rotation': '-4deg' },
  transform: 'rotate(-184deg)',
  animationDelay: '2.5s',
  zIndex: 2,

  '@media': {
    '(max-width: 798px)': {
      width: '2.3rem',
      height: '2.3rem',
      bottom: '11rem',
      right: '18rem',
    },
  },
}]);

// 모바일 전용 블러 풍등들
export const blurLantern7 = style([floatingLanternCustom, {
  width: '1.5rem',
  height: '1.5rem',
  bottom: '27rem',
  left: '20rem',
  vars: { '--base-rotation': '8deg' },
  transform: 'rotate(-172deg)',
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
  width: '2.3rem',
  height: '2.3rem',
  bottom: '10rem',
  left: '14rem',
  vars: { '--base-rotation': '10deg' },
  transform: 'rotate(-170deg)',
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
  width: '1.5rem',
  height: '1.5rem',
  bottom: '13rem',
  left: '20rem',
  vars: { '--base-rotation': '10deg' },
  transform: 'rotate(-170deg)',
  animationDelay: '4.5s',
  zIndex: 2,
  display: 'block',

  '@media': {
    '(min-width: 799px)': {
      display: 'none',
    },
  },
}]);