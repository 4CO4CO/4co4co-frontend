import { createBrowserRouter } from 'react-router-dom';
import { LanternPage, FormPage, EntryPage, LanternDetailPage } from './lazy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FormPage />,
  },
  {
    path: '/entry',
    element: <EntryPage />,
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
