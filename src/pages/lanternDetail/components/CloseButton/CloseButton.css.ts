import { style } from '@vanilla-extract/css';
import { Z_INDEX } from '../../constants/zIndex';
import { dangerousLg } from '@/components/common/Button/Button.css';

export const closeButton = style([
  dangerousLg,
  {
    position: 'absolute',
    top: '1.2rem',
    left: '1.2rem',
    zIndex: Z_INDEX.CLOSE_BUTTON,
  }
]);