import { StrictMode } from 'react'
import { BrowserRouter, ru } from 'react-router-dom/dist';
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename='/test-task-alfa/'>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
