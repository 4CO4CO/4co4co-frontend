import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSubscribeStatus } from '@/queries/lantern/useSubscribeStatus';

export const SSELayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const entryCode = (location.state as { lantern_id?: string })?.lantern_id;

  useSubscribeStatus({
    lanternId: entryCode ?? '',
    onDone: () => {
      const existingCodes = JSON.parse(localStorage.getItem('successLanterns') || '[]');
      existingCodes.push(entryCode);
      localStorage.setItem('successLanterns', JSON.stringify(existingCodes));

      navigate(`/lanterns?currentLanternId=${entryCode}`);
    },
  });

  return <Outlet />;
};
