import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHandMark } from '@/hooks/useHandMark';
import { isFist, isInside } from '@/utils';

export const useCloseGesture = (closeButtonRef: React.RefObject<HTMLButtonElement | null>) => {
  const navigate = useNavigate();
  const hasNavigatedRef = useRef(false);
  const { handCenter, marks, handedness } = useHandMark();

  useEffect(() => {
    if (!handCenter || !marks || !handedness || !closeButtonRef.current) return;

    const rect = closeButtonRef.current.getBoundingClientRect();
    const indexTip = marks.find((k) => k.name === 'index_finger_tip');
    if (!indexTip) return;

    const fist = isFist(marks);

    if (fist && isInside(handCenter, rect) && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      navigate(-1);
    }
  }, [marks, handedness, navigate, closeButtonRef]);

  return { marks, handedness };
};
