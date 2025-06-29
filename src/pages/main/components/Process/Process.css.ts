import { style } from '@vanilla-extract/css';

export const container = style({
  minHeight: '100vh',
  backgroundColor: '#f9f6ef',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 1rem',

  '@media': {
    '(max-width: 798px)': {
      padding: '2rem 1rem',
    }
  }
});

export const contentWrapper = style({
  maxWidth: '1200px',
  width: '100%',

  '@media': {
    '(max-width: 798px)': {
      maxWidth: '80%',
      padding: '0 1rem',
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
  marginBottom: '36px',
  textAlign: 'left',
});

export const processGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '35px',
  width: '100%',
  alignItems: 'start',
});

export const desktopGrid = style({
  '@media': {
  '(max-width: 425px)': {
      display: 'none',
    }
  }
});

export const mobileContainer = style({
  display: 'none',

  '@media': {
    '(max-width: 425px)': {
      display: 'block',
      overflow: 'hidden',
      width: 'calc(140px * 2 + 35px)',
      margin: '0 auto',
    }
  }
});

export const mobileSlider = style({
  '@media': {
    '(max-width: 798px)': {
      display: 'flex',
      flexDirection: 'row',
      gap: '35px',
      width: 'fit-content',
    },
    '(max-width: 425px)': {
      gap: '20px',
    }
  }
});
