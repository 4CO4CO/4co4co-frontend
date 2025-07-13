import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHandMark } from '@/components/lantern/hooks/useHandMark';
import { isFist } from '@/components/lantern/utils';

export const useCloseGesture = (closeButtonRef: React.RefObject<HTMLButtonElement | null>) => {
  const navigate = useNavigate();
  const hasNavigatedRef = useRef(false);
  const { marks, handedness } = useHandMark();

  useEffect(() => {
    if (!marks || !handedness || !closeButtonRef.current) return;

    const rect = closeButtonRef.current.getBoundingClientRect();
    const indexTip = marks.find((k) => k.name === 'index_finger_tip');
    if (!indexTip) return;

    const isInCloseArea =
      indexTip.x >= rect.left &&
      indexTip.x <= rect.right &&
      indexTip.y >= rect.top &&
      indexTip.y <= rect.bottom;

    const fist = isFist(marks, handedness);

    if (fist && isInCloseArea && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      navigate(-1);
    }
  }, [marks, handedness, navigate, closeButtonRef]);

  return { marks, handedness };
};