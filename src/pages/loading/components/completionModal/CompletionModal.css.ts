import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
});

export const modal = style({
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '30px 90px',
  maxWidth: '80vw',
  textAlign: 'center',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
  position: 'relative',

  '@media': {
    'screen and (max-width: 768px)': {
      padding: '20px 30px',
      maxWidth: '90vw',
      borderRadius: '15px',
    }
  }
});

export const title = style({
  color: '#F89D2C',
  fontFamily: 'Pretendard',
  fontSize: '24px',
  fontWeight: '700',
  letterSpacing: '2.4px',
  marginBottom: '20px',

  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '18px',
      letterSpacing: '1.8px',
      marginBottom: '15px',
    }
  }
});

export const message = style({
  color: '#626262',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '18px',
  fontWeight: '700',
  marginBottom: '30px',
  whiteSpace: 'pre-line',

  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '14px',
      marginBottom: '20px',
    }
  }
});

export const buttonContainer = style({
  display: 'flex',
  gap: '6px',
  justifyContent: 'center',
  alignItems: 'center',

  '@media': {
    'screen and (max-width: 768px)': {
      gap: '6px',
    }
  }
});

export const enterButton = style({
  color: '#000',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '16px',
  fontWeight: '700',
  borderRadius: '10px',
  background: '#FCBC42',
  padding: '17px 70px',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '14px',
      padding: '12px 50px',
    }
  }
});

export const cancelButton = style({
  color: '#FFF',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '16px',
  fontWeight: '700',
  borderRadius: '10px',
  background: '#B9B9B9',
  padding: '17px 33px',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '14px',
      padding: '12px 25px',
    }
  }
});