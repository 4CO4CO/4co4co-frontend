import { globalStyle } from '@vanilla-extract/css';
import { colors } from './color.css';

globalStyle('html', {
  fontSize: '62.5%',
});

globalStyle('body', {
  fontFamily: 'Pretendard, sans-serif',
  background: colors.color.white200,
});
