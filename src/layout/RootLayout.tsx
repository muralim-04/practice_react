import { Outlet } from 'react-router-dom';
import Navbar from './Navabar';

export default function RootLayout() {
  return (
    <div >
      <Navbar />

      <main style={{ padding: '24px' }}>
        <Outlet />
      </main>
      
    </div>
  );
}