import { createBrowserRouter } from 'react-router';
import { UploadImagePage } from './lazy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UploadImagePage />,
  },
]);

export default router;
