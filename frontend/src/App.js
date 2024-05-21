import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './compnents/navbar/Navbar';
import Home from './compnents/home/Home';
import Signup from './compnents/SignupIn/Signup';
import Profile from './compnents/profile/Profile';
import NotFound from './compnents/notFound/NotFound';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path='/home' element={<Home />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
