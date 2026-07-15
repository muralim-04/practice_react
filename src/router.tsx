import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import HomePage from './features/home/HomePage';
import UserPage from './features/user/UserPage';
import type { Data } from './types/DefaultData';
import Register from './features/auth/RegisterPage';
import LogIn from './features/auth/LogInPage';

const mockDataInstance: Data = {
    name: "John",
    age: 22
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, 
    children: [
      {
        path: '', 
        element: <HomePage data={mockDataInstance}/>,
        
      },
      {
        path: 'user', 
        element: <UserPage />,
      },
      {
        path: 'register', 
        element: <Register />,
      },
      {
        path: 'login', 
        element: <LogIn />,
      },
    ],
  },
]);