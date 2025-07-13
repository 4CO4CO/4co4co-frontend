import { style } from '@vanilla-extract/css';
import { Z_INDEX } from '../../constants/zIndex';

export const closeButton = style({
  position: 'absolute',
  top: 12,
  left: 12,
  zIndex: Z_INDEX.CLOSE_BUTTON,
  borderRadius: 10,
  backgroundColor: '#FF0F0F',
  border: 'none',
  padding: '17px 26px',
  color: '#FFF',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: 16,
  fontWeight: 700,
  cursor: 'pointer',
});