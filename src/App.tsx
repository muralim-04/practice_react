
import type { Data } from './types/DefaultData'; 
import HomePage from './features/home/HomePage';
import Navbar from './layout/Navabar';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {

  const mockDataInstance: Data = {
    name: "Muralim",
    age: 22
  };


  return (
    <BrowserRouter>
      <Navbar />

      <HomePage data={mockDataInstance} />
      
    </BrowserRouter>
  );
}

export default App;
