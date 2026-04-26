import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx' // Standard import of your App hub
import './index.css'

/**
 * FORGEFOLIO v3.9.7 ENTRY POINT
 * This file is purely for mounting the React application.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)