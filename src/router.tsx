import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import HomePage from './features/home/HomePage';
import UserPage from './features/user/UserPage';
import Register from './features/auth/RegisterPage';
import LogIn from './features/auth/LogInPage';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, 
    children: [
      {
        path: '', 
        element: <HomePage />,
        
      },
      {
        path: 'user', 
        element: <UserPage />,
        errorElement: <h1>Error occurred while fetching the data</h1>,
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