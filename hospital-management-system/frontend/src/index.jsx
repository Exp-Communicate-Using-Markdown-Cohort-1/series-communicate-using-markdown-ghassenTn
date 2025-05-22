import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css' // We'll create this for global styles if needed, for now tailwind is imported in App.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
