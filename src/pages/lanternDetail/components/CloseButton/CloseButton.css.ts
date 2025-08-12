import { style } from '@vanilla-extract/css';
import { Z_INDEX } from '../../constants/zIndex';
import { variantStyles } from '@/components/common/button/index.css';
import { fonts } from '@/styles/font.css';

export const closeButton = style([
  variantStyles.dangerous,
  {
    position: 'absolute',
    top: '5rem',
    left: '5rem',
    zIndex: Z_INDEX.CLOSE_BUTTON,
    padding: '1.7rem 2.6rem',
    borderRadius: '1rem',
    ...fonts.font.body_16_R,
  }
]);