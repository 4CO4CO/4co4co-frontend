import { createBrowserRouter } from 'react-router-dom';
import { LanternPage, FormPage, LanternDetailPage } from './lazy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FormPage />,
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
