import { useEffect, useState } from 'react';
import { useHandMark } from './useHandMark';
import { LanternWithRect } from '../constants';
import { isFist, isInside } from '@/components/common/lantern/utils';

export const useLanternHit = (lanterns: LanternWithRect[]) => {
  const [hitLanternId, setHitLanternId] = useState<string | null>(null);
  const { handCenter, marks, handedness } = useHandMark();

  useEffect(() => {
    if (!handCenter || !marks || !handedness) return;

    const fist = isFist(marks, handedness);
    if (!fist) {
      setHitLanternId(null);
      return;
    }

    const hit = lanterns.find((lantern) => isInside(handCenter, lantern.rect));
    setHitLanternId(hit?.lantern_id ?? null);
  }, [handCenter, marks, handedness, lanterns]);

  return { hitLanternId };
};
