import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { AuthProvider } from './context/authProvider.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes> 
          <Route path='/*'  element={<App/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
)
