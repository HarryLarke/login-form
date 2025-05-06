import { useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { AxiosResponse, isAxiosError } from "axios"
import useData from "../hooks/useData"
import useAuth from "../hooks/useAuth"

//Always load employees with each component or implment context??? Redux would always be cleaner ;(
//Think it would be good to set the state of all employees, instead of the seletcted one - see how affects the name on the Edit page?

interface Employee {
    id: string
    firstname: string
    lastname: string
}

interface GetResponse {
    employees : Employee[]
}

const ViewEmployees = () => {
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()
    const { employees, setEmployees } = useData()
    const { auth } = useAuth()

    console.log(auth?.accessToken)

    useEffect(() => {
        let isMounted = true 
        const controller = new AbortController()
        const getEmployees = async () => {
            try {
                const response: AxiosResponse<GetResponse> = await axiosPrivate.get('/employees', {
                    signal: controller.signal,
                    withCredentials: true
                })
                console.log(response?.data)
                console.log(response?.data?.employees)
                isMounted && setEmployees(response?.data?.employees)
            } catch(err:unknown) {
                    if(isAxiosError(err)) {
                        console.log(err.message)
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

    if(!employees) {
        content = <p>No users to display...</p>
    }  else {
        console.log(employees)
        content = <ul>
            {employees.map((employee) => (<li key={employee.id}
            >Name:{employee.firstname}</li>))} 
        </ul>
    }

  return (
    <>
    <h1>View Employees</h1>

    <section>
        {content}
        <Link to={'/'}>Home</Link>
        <Link to={'/addEmployee'}>Add Employee</Link>
    </section>

    </>
  )
}

export default ViewEmployees
