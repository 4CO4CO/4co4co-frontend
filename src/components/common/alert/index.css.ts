import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@/styles/color.css';
import { fonts } from '@/styles/font.css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: colors.color.blackDimmed,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
});

export const modal = style({
  backgroundColor: colors.color.white,
  borderRadius: '1.2rem',
  textAlign: 'center',
  boxShadow: '0 1rem 3rem rgba(0, 0, 0, 0.1)',
  position: 'relative',
  maxWidth: '80vw',
});

export const modalSize = styleVariants({
  lg: {
    padding: '3rem 9rem',
  },
  sm: {
    padding: '3rem 2.5rem',
  },
});

export const titleSize = styleVariants({
  lg: {
    color: colors.color.sunsetGlow,
    ...fonts.font.title_28_B,
    marginBottom: '1.0rem',
  },
  sm: {
    color: colors.color.sunsetGlow,
    ...fonts.font.title_18_B,
    marginBottom: '1.5rem',
  },
});

export const messageSize = styleVariants({
  lg: {
    color: colors.color.gray300,
    textAlign: 'center',
    ...fonts.font.body_18_B,
    marginBottom: '2rem',
  },
  sm: {
    color: colors.color.gray300,
    textAlign: 'center',
    ...fonts.font.body_14_B,
    marginBottom: '2rem',
  },
});

export const buttonContainer = styleVariants({
  lg: {
    display: 'flex',
    gap: '0.6rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sm: {
    display: 'flex',
    gap: '0.6rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
