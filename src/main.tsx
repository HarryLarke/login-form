import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { AuthProvider } from './context/authProvider.tsx'
import { DataProvider } from './context/dataProvider.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(

    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes> 
            <Route path='/*'  element={<App/>}/>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>

)
