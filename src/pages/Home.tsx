import { Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"

const Home = () => {
    //Could have a conditional variable to send you to the specific pages, based on roles, access, etc. 
    //This will still require access control on the router. 
    //Make sure that roles are sent via cookies! Don't be sending lots info in the JS concerning roles!
    const logout = useLogout()
  return (
    <>
        <h1>Home Page</h1>

        <section>
            <h2>Please choose a page:</h2>
            <ul>
              <li><Link to={'/employees'}>View Employees</Link></li>
              <li><Link to={'/addEmployee'}>Add Employee</Link></li>
            </ul>

            <button onClick={logout}>Logout</button> 
        </section>
    </>
  )
}

export default Home
