import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './compnents/navbar/Navbar';
import Home from './compnents/home/Home';
import Signup from './compnents/SignupIn/Signup';

function App() {
  return (
    <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
