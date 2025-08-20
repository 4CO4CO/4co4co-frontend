/* eslint-disable no-undef */
import React, { createContext, useContext } from 'react';
import { useRtcChannel } from '../hooks/useRtcChannel';

interface RtcContextType {
  ready: boolean;
  state: RTCPeerConnectionState;
  send: (d: unknown) => void;
  qrUrl: string | null;
  sessionId: string;
  reconnect: () => void;
}

const RtcContext = createContext<RtcContextType | null>(null);

export const RtcProvider = ({ children, roomId }: { children: React.ReactNode; roomId: string }) => {
  const { ready, state, send, qrUrl, sessionId, reconnect } = useRtcChannel({ role: 'sender', roomId });

  return (
    <RtcContext.Provider value={{ ready, state, send, qrUrl, sessionId, reconnect }}>{children}</RtcContext.Provider>
  );
};

export const useRtc = () => {
  const context = useContext(RtcContext);
  if (!context) {
    throw new Error('RTC Provider 내부에서 사용해주세요');
  }
  return context;
};
