import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import Contacts from './components/contacts/contacts';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <App />} />
      <Route path='/contacts' element={ <Contacts /> } />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
