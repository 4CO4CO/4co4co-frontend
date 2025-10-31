// import { useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  // useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { RtcProvider } from '@/context/RtcProvider';
// import { useSubscribeStatus } from '@/queries/lantern/useSubscribeStatus';

export const SSELayout = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentLanternId = searchParams.get('currentLanternId');
  const entryCode = currentLanternId ?? (location.state as { lantern_id?: string })?.lantern_id;
  // const [isCompleted, setIsCompleted] = useState(false);

  // useSubscribeStatus({
  //   lanternId: entryCode ?? '',
  //   onDone: () => {
  //     setIsCompleted(true);
  //   },
  // });

  // useEffect(() => {
  //   if (isCompleted && entryCode) {
  //     navigate(`/lanterns?currentLanternId=${entryCode}`);
  //   }
  // }, [isCompleted, navigate, entryCode]);

  return (
    <RtcProvider roomId={entryCode ?? ''}>
      <Outlet />
    </RtcProvider>
  );
};
