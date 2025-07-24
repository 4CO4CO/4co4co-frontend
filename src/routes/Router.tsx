import { createBrowserRouter } from 'react-router-dom';
import { MainPage, LanternPage, UploadPage, EntryPage, LanternDetailPage, LoadingPage } from './lazy';
import { SSELayout } from './SSELayout';

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
    element: <SSELayout />,
    children: [
      { path: '/loading', element: <LoadingPage /> },
      { path: '/lanterns', element: <LanternPage /> },
    ],
  },
  {
    path: '/lanterns/:lanternId',
    element: <LanternDetailPage />,
  },
]);

export default router;
