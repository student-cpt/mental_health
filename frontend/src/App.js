import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './compnents/navbar/Navbar';
import Home from './compnents/home/Home';

function App() {
  return (
    <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/home' element={<Home />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
