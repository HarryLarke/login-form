import { Routes, Route } from "react-router"

import Layout from "./components/Layout"
import Login from "./components/Login"

function App() { 
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Login/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
