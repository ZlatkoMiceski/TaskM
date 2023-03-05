import React, { useState } from 'react';
import './App.css';

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './app/pages/Home';
import Results from './app/pages/Results';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/results' element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
