import { createBrowserRouter } from 'react-router-dom';
import { UploadImagePage } from './lazy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UploadImagePage />,
  },
]);

export default router;
