import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

export const container = style({
  minHeight: '100vh',
  backgroundColor: colors.color.white200,
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
  color: colors.color.black,
  ...fonts.font.title_28_B,
  marginBottom: '3.6rem',
  textAlign: 'left',
});

export const processGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '3.5rem',
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
      width: 'calc(14rem * 2 + 3.5rem)',
      margin: '0 auto',
    }
  }
});

export const mobileSlider = style({
  '@media': {
    '(max-width: 798px)': {
      display: 'flex',
      flexDirection: 'row',
      gap: '3.5rem',
      width: 'fit-content',
    },
    '(max-width: 425px)': {
      gap: '2rem',
    }
  }
});
