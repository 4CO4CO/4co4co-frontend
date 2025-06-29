import { createBrowserRouter } from 'react-router-dom';
import { MainPage, LanternPage, FormPage, EntryPage, LanternDetailPage } from './lazy';

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
