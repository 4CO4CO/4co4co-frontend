import { useEffect, useState } from 'react';
import { useHandMark } from './useHandMark';
import { LanternWithRect } from '../components/common/lantern/constants';
import { isFist, isInside } from '@/utils';

export const useLanternHit = (lanterns: LanternWithRect[]) => {
  const [hitLanternId, setHitLanternId] = useState<string | null>(null);
  const { handCenter, marks, handedness } = useHandMark();

  useEffect(() => {
    if (!handCenter || !marks || !handedness) return;

    const fist = isFist(marks);
    if (!fist) {
      setHitLanternId(null);
      return;
    }

    const hit = lanterns.find((lantern) => isInside(handCenter, lantern.rect));
    setHitLanternId(hit?.lantern_id ?? null);
  }, [handCenter, marks, handedness, lanterns]);

  return { hitLanternId };
};
