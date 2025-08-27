import { createBrowserRouter, RouterProvider } from 'react-router';

import Create from './routes/create';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const router = createBrowserRouter([{ index: true, element: <Create /> }]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
