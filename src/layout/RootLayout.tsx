import { Outlet } from 'react-router-dom';
import Navbar from './Navabar';
import { Suspense } from 'react';

export default function RootLayout() {
  return (
    <div >
      <Navbar />

        <main style={{ padding: '24px' }}>
          <Suspense fallback={<p>Loading...</p>}>
            <Outlet />
          </Suspense>
        </main>

    </div>
  );
}