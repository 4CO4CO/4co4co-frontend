import { createBrowserRouter } from 'react-router-dom';
import { MainPage, LanternPage, UploadPage, EntryPage, LanternDetailPage, LoadingPage, WatchPage } from './lazy';
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
    path: '/watch',
    element: <WatchPage />,
  },
  {
    element: <SSELayout />,
    children: [
      { path: '/loading', element: <LoadingPage /> },
      { path: '/lanterns', element: <LanternPage /> },
      {
        path: '/lanterns/:lanternId',
        element: <LanternDetailPage />,
      },
    ],
  },
]);

export default router;
