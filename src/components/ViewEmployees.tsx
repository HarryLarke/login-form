import { useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { AxiosResponse, isAxiosError } from "axios"
import useData from "../hooks/useData"

//Always load employees with each component or implment context??? Redux would always be cleaner ;(
//Think it would be good to set the state of all employees, instead of the seletcted one - see how affects the name on the Edit page?

interface Employee {
    id: string
    name: string
}

interface GetResponse {
    employees : Employee[]
}

const ViewEmployees = () => {
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()
    const { employees, setEmployees } = useData()

    const goBack = () => navigate(-1)

    useEffect(() => {
        let isMounted = true 
        const controller = new AbortController()
        const getEmployees = async () => {
            try {
                const response: AxiosResponse<GetResponse> = await axiosPrivate.get('/employees', {
                    signal: controller.signal 
                })
                isMounted && setEmployees(response.data.employees) 
            } catch(err:unknown) {
                    if(isAxiosError(err)) {
                        console.log(err.message),
                            goBack
                     }
                    } 
                }
    
        getEmployees()

        return () => {
            isMounted = false
            controller.abort()
        }

    }, [axiosPrivate, location, navigate])


    let content 

    if(!employees || employees.length === 0) {
        content = <p>No users to display...</p>
    }  else {
        content = <ul>
            {employees.map((employee) => <li key={employee.id}
            >Name:{employee.name}<Link to={`/employees/edit/${employee.id}`}>Edit</Link></li>)} 
        </ul>
    }

  return (
    <>
    <h1>View Users</h1>

    <section>
        {content}
        <Link to={'/'}>Home</Link>
        <Link to={'/addEmployee'}>Add Employee</Link>
    </section>

    </>
  )
}

export default ViewEmployees
