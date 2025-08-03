import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSubscribeStatus } from '@/queries/lantern/useSubscribeStatus';

export const SSELayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const entryCode = (location.state as { lantern_id?: string })?.lantern_id;

  useSubscribeStatus({
    lanternId: entryCode ?? '',
    onDone: () => {
      navigate(`/lanterns?current_lantern_id=${entryCode}`);
    },
  });

  return <Outlet />;
};
