import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './compnents/navbar/Navbar';
import Home from './compnents/home/Home';
import Profile from './compnents/profile/Profile';
import NotFound from './compnents/notFound/NotFound';
import Signup from './compnents/SignupIn/Signup';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path='/:username/home' element={<Home />} />
            <Route path='/:username/profile' element={<Profile />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<NotFound />} />
  
          </Routes>
      </BrowserRouter>
  );
}

export default App;
