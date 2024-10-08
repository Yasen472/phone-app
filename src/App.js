import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar.js';
import Home from './components/home/home.js';
import Contacts from './components/contacts/contacts.js';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
    </Routes>
    </>
  );
}

export default App;
