import Webcam from 'react-webcam';
import { video } from './video.css';

export const VideoFeed = () => {
  return (
    <div className={video.container}>
      <Webcam audio={false} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
