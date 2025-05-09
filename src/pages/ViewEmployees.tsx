import { Link } from "react-router"
import Employees from "../components/Employees"

const ViewEmployees = () => {
 
  return (
    <>
    <h1>View Employees</h1>

    <section>
        <Employees/>
        <Link to={'/'}>Home</Link>
        <Link to={'/addEmployee'}>Add Employee</Link>
    </section>

    </>
  )
}

export default ViewEmployees
