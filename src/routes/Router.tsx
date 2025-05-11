import { createBrowserRouter } from 'react-router-dom';
import { LanternPage, FormPage } from './lazy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FormPage />,
  },
  {
    path: '/lanterns',
    element: <LanternPage />,
  },
]);

export default router;
