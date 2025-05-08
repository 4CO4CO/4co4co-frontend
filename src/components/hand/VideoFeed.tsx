import { forwardRef, useImperativeHandle, useRef } from 'react';
import Webcam from 'react-webcam';
import { video } from './video.css';

export type VideoFeedRef = {
  getVideoElement: () => HTMLVideoElement | null;
};

export const VideoFeed = forwardRef<VideoFeedRef>((_, ref) => {
  const webcamRef = useRef<Webcam>(null);

  useImperativeHandle(ref, () => ({
    getVideoElement: () => webcamRef.current?.video || null,
  }));

  return (
    <div className={video.container}>
      <Webcam className={video.invisibleVideo} ref={webcamRef} audio={false} />
    </div>
  );
});

VideoFeed.displayName = 'VideoFeed';
