import { Routes, Route } from "react-router"

import Layout from "./pages/Layout"
import Login from "./pages/Login"
import Unauthorized from "./pages/Unauthorised"
import Home from "./pages/Home"
import RequireAuth from "./components/RequireAuth"
import ViewEmployees from "./pages/ViewEmployees"
import AddEmployee from "./pages/AddEmployee"
import EditEmployee from "./pages/EditEmployee"
import Missing from "./pages/Missing"

//Will need some route protection!!!
//Currentlly a string - will be a stringType when coming from the AT?
const ROLES = {
  'user': 2001,
  'admin': 5150,
  'editor': 1982
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
          <Route element={<RequireAuth allowedRoles={[ROLES.user]}/>}>
          <Route path='/' element={<Home/>}/> 
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.editor]}/>}>
            <Route path="/viewEmployees" element={<ViewEmployees/>}/>
          </Route>
    
          <Route element={<RequireAuth allowedRoles={[ROLES.editor]}/>}>
            <Route path="/employees/:id" element={<EditEmployee/>}/>
            <Route path="/addEmployee" element={<AddEmployee/>}/>
          </Route>
        
        <Route path="*" element={<Missing/>}/>

        </Route>
      </Route>
    </Routes>
  )
}

export default App
