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
  'User': 2001,
  'Admin': 5150,
  'Editor': 1984
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
          <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
          <Route path='/' element={<Home/>}/> 
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]}/>}>
            <Route path="/viewEmployees" element={<ViewEmployees/>}/>
          </Route>
    
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]}/>}>
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
