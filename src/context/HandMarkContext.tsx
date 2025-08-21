import { Keypoint } from '@tensorflow-models/hand-pose-detection';
import React, { createContext, useContext, ReactNode } from 'react';
import { useHandMark } from '@/hooks/useHandMark';

interface HandMarkContextType {
  handCenter: { x: number; y: number } | null;
  marks: Keypoint[] | null;
  handedness: 'Left' | 'Right' | null;
}

const HandMarkContext = createContext<HandMarkContextType | null>(null);

interface HandMarkProviderProps {
  children: ReactNode;
  enabled?: boolean; // 손 감지 활성화 여부
}

export const HandMarkProvider: React.FC<HandMarkProviderProps> = ({
  children,
  enabled = true
}) => {
  const handMarkResult = useHandMark();

  const handMarkData = enabled ? handMarkResult : {
    handCenter: null,
    marks: null,
    handedness: null
  };

  return (
    <HandMarkContext.Provider value={handMarkData}>
      {children}
    </HandMarkContext.Provider>
  );
};

// 컨텍스트를 사용하는 커스텀 훅
export const useHandMarkContext = (): HandMarkContextType => {
  const context = useContext(HandMarkContext);
  if (!context) {
    // 컨텍스트가 없으면 기본값 반환 (에러 대신)
    return {
      handCenter: null,
      marks: null,
      handedness: null
    };
  }
  return context;
};