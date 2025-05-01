import { Routes, Route } from "react-router"

import Layout from "./components/Layout"
import Login from "./components/Login"
import Unauthorized from "./components/Unauthorised"
import Home from "./components/Home"
import RequireAuth from "./components/RequireAuth"
//Will need some route protection!!!

const ROLES = {
  'user': 2001,
  'editor': 1984,
  'admin': 5150
}

function App() { 
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Layout/>}>
          {/* Public Routes */}
          <Route path="/login" element={<Login/>}/>
          <Route path ="/unauthorized" element={<Unauthorized/>}/>

          {/* Protected Routes */}
          <Route element={<RequireAuth allowedRoles={ROLES.user}/>}>
          <Route path='/home' element={<Home/>}/> 
          </Route>
    
        </Route>
      </Route>
    </Routes>
  )
}

export default App
