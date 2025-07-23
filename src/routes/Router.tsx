import { createBrowserRouter } from 'react-router-dom';
import { MainPage, LanternPage, UploadPage, EntryPage, LanternDetailPage, LoadingPage } from './lazy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/upload',
    element: <UploadPage />,
  },
  {
    path: '/entry',
    element: <EntryPage />,
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
