import React, { createContext, useContext } from 'react';
import { useRtcChannel } from '../hooks/useRtcChannel';

interface RtcContextType {
  ready: boolean;
  send: (data: unknown) => void;
}

const RtcContext = createContext<RtcContextType | undefined>(undefined);

export const RtcProvider = ({ children, roomId }: { children: React.ReactNode; roomId: string | null }) => {
  const { ready, send } = useRtcChannel('sender', roomId);

  return <RtcContext.Provider value={{ ready, send }}>{children}</RtcContext.Provider>;
};

export const useRtc = () => {
  const context = useContext(RtcContext);
  if (context === undefined) {
    throw new Error('RTC Provider 내부에서 사용해주세요');
  }
  return context;
};
