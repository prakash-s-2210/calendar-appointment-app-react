import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import ContextWrapper from './context/ContextWrapper';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ContextWrapper>
    <App />
  </ContextWrapper>
  </BrowserRouter>
);