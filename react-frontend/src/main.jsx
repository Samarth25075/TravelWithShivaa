import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

import { SettingsProvider } from './context/SettingsContext.jsx'

// Configure Axios
axios.defaults.baseURL = '/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </HelmetProvider>
  </React.StrictMode>,
)

