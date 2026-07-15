import { Outlet } from 'react-router-dom';
import Navbar from '../layout/Navabar';

export default function RootLayout() {
  return (
    <div className="app-container">
      <Navbar />
      {/* Dynamic page content gets injected here */}
      <main style={{ padding: '24px' }}>
        <Outlet />
      </main>
    </div>
  );
}