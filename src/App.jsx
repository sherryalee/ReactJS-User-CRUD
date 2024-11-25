import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Update from './Update';
import Read from './Read';
import 'Bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/read/:id" element={<Read />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
