import { style } from '@vanilla-extract/css';
import { Z_INDEX } from '../../constants/zIndex';
import { variantStyles } from '@/components/common/button/index.css';
import { fonts } from '@/styles/font.css';

export const closeButton = style([
  variantStyles.dangerous,
  {
    position: 'absolute',
    top: '3rem',
    right: '50%',
    transform: 'translateX(50%)',
    width: '50vw',
    zIndex: Z_INDEX.CLOSE_BUTTON,
    padding: '2rem 3.6rem',
    borderRadius: '1rem',
    ...fonts.font.title_18_B
  }
]);