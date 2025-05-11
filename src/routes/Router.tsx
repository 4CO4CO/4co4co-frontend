import { createBrowserRouter } from 'react-router-dom';
import { UploadImagePage } from './lazy';
import MVP from '@/pages/handInteraction/MVP';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UploadImagePage />,
  },
  {
    path: '/detect',
    element: <MVP />,
  },
]);

export default router;
