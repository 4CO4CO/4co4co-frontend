import { useState } from 'react';
import { HandTracker } from '../../components/hand/HandTracker';
import { VideoFeed } from '../../components/hand/VideoFeed';

const MVP = () => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  return (
    <>
      <VideoFeed />
      <HandTracker onUpdate={setPos} />
      {pos && (
        <div
          style={{
            position: 'absolute',
            top: pos.y,
            left: pos.x,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: 'lime',
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
};

export default MVP;
