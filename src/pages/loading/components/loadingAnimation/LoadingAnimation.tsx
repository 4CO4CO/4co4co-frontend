import React from 'react';
import * as styles from './LoadingAnimation.css';

const LoadingAnimation: React.FC = () => {
  return (
    <div className={styles.container}>
      <svg width="170" height="170" viewBox="0 0 170 170" className={styles.svg}>
        <defs>
          {/* 태양 그라디언트 */}
          <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCDA1C" />
            <stop offset="100%" stopColor="#EEA522" />
          </linearGradient>
          {/* 달 그라디언트 */}
          <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCDA1C" />
            <stop offset="100%" stopColor="#EEA522" />
          </linearGradient>
        </defs>

        {/* ⭐ 해와 달을 먼저 그리기 (뒤쪽에 위치) */}
        <circle
          className={styles.sun}
          cx="85"
          cy="60"
          r="15"
        />

        <path
          className={styles.moon}
          d="M57.947 59.3232C57.24 69.3632 48.667 77.5316 38.407 77.98C31.168 78.2919 24.694 74.9387 20.809 69.6556C19.2 67.4916 20.064 66.049 22.751 66.5364C24.066 66.7703 25.419 66.8678 26.832 66.8093C36.425 66.4194 44.273 58.446 44.312 49.0299C44.332 46.4955 43.802 44.0976 42.841 41.9142C41.781 39.4968 43.056 38.3466 45.509 39.3798C53.278 42.6355 58.594 50.414 57.947 59.3232Z"
        />

        {/* ⭐ 산 그룹을 나중에 그리기 (앞쪽에 위치하여 해/달을 가림) */}
        <g className={styles.mountainGroup}>
          <path
            d="M52.1782 85L148.66 214.722H-44.3037L52.1782 85Z"
          />
          <path
            d="M148.073 133.203L203.032 214.013H93.1152L148.073 133.203Z"
          />
        </g>
      </svg>
    </div>
  );
};

export default LoadingAnimation;