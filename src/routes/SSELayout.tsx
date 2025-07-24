import { Outlet, useLocation } from 'react-router-dom';
import { useSubscribeStatus } from '@/queries/lantern/useSubscribeStatus';

export const SSELayout = () => {
  const location = useLocation();
  const entryCode = (location.state as { lantern_id?: string })?.lantern_id;

  useSubscribeStatus({
    lanternId: entryCode ?? '',
    onDone: () => {
      console.log('SSE 완료됨');
    },
  });

  return <Outlet />;
};
