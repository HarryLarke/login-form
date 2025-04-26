import { Routes, Route } from "react-router"

import Layout from "./components/Layout"
import Login from "./components/Login"
import Home from "./components/Home"
//Will need some route protection!!!
function App() { 
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Layout/>}>
          {/* Public Routes */}
          <Route path="login" element={<Login/>}/>

          {/* Protected Routes */}
          <Route path='/home' element={<Home/>}/> 
    
        </Route>
      </Route>
    </Routes>
  )
}

export default App
