import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const lanternBox = recipe({
  base: {
    position: 'absolute',
    borderRadius: 8,
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    state: {
      normal: {
        backgroundColor: 'skyblue',
      },
      hit: {
        backgroundColor: 'orange',
      },
    },
  },
  defaultVariants: {
    state: 'normal',
  },
});

export const handPointer = style({
  position: 'absolute',
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: 'lime',
  pointerEvents: 'none',
  zIndex: 100,
});
