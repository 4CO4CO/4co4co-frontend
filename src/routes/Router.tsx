import { createBrowserRouter } from 'react-router-dom';
import { LanternPage, FormPage, LanternDetailPage, LoadingPage } from './lazy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FormPage />,
  },
  {
    path: '/loading',
    element: <LoadingPage />,
  },
  {
    path: '/lanterns',
    element: <LanternPage />,
  },
  {
    path: '/lanterns/:lanternId',
    element: <LanternDetailPage />,
  },
]);

export default router;
