import { Routes, Route } from "react-router"

import Layout from "./components/Layout"
import Login from "./components/Login"
import Unauthorized from "./components/Unauthorised"
import Home from "./components/Home"
import RequireAuth from "./components/RequireAuth"
import ViewEmployees from "./components/ViewEmployees"
import AddEmployee from "./components/AddEmployee"
import EditEmployee from "./components/EditEmployee"
//Will need some route protection!!!
//Currentlly a string - will be a stringType when coming from the AT?
const ROLES = {
  'user': '2001',
  'editor': '1984',
  'admin': '5150'
}
//Still need  to find a way to have mutliple rolles in ReqAuth - will sort out later sinc backend organised to suite without!
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
          <Route path='/' element={<Home/>}/> 
          </Route>

          <Route element={<RequireAuth allowedRoles={ROLES.editor}/>}>
            <Route path="/employees" element={<ViewEmployees/>}/>
          </Route>
    
          <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
            <Route path="/employees/:id" element={<EditEmployee/>}/>
            <Route path="/addEmployee" element={<AddEmployee/>}/>
          </Route>
        
        </Route>
      </Route>
    </Routes>
  )
}

export default App
