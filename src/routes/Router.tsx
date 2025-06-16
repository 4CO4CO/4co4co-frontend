import { createBrowserRouter } from 'react-router-dom';
import { LanternPage, FormPage, LanternDetailPage, MainPage } from './lazy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/upload',
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
