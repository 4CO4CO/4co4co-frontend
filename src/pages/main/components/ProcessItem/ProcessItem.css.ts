import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '30px',
  backgroundColor: '#fff',
  borderRadius: '20px',
  width: '300px',
  height: '321px',
  position: 'relative',
  boxSizing: 'border-box',

  '@media': {
    '(max-width: 798px)': {
      padding: '20px 14px',
      width: '140px',
      height: '215px',
    }
  }
});

export const title = style({
  color: '#000',
  fontFamily: 'Pretendard',
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: 'normal',
  letterSpacing: '2.8px',
  margin: 0,
  textAlign: 'left',
});

export const iconWrapper = style({
  display: 'flex',
  justifyContent: 'flex-end',
  flex: 1,
  alignItems: 'center',

  '@media': {
    '(max-width: 798px)': {
      justifyContent: 'center',
      flex: 1,
    }
  }
});

export const icon = style({
  width: '135px',
  height: '135px',
  objectFit: 'contain',

  '@media': {
    '(max-width: 798px)': {
      width: '75px',
      height: '75px',
      flexShrink: 0,
    }
  }
});

export const description = style({
  color: '#626262',
  fontFamily: 'Pretendard',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
  margin: 0,
  textAlign: 'left',

  '@media': {
    '(max-width: 798px)': {
      fontSize: '10px',
      textAlign: 'left',
    }
  }
});