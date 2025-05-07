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

    //Potentially reset employee data with each reload?

    useEffect(() => {
        let isMounted = true 
        const controller = new AbortController()
        const getEmployees = async () => {
            try {
                const response: AxiosResponse<GetResponse, any> = await axiosPrivate.get('/employees', {
                    signal: controller.signal,
                    withCredentials: true
                })
                console.log(response?.data)
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
    //Potentiall just map names because - don't really want ID being accessed by JS hacking!

    let content 

    if(!employees || employees.length === 0) {
        content = <p>No users to display...</p>
    }  else {
        console.log(employees)
        content = <ol>
            {employees.map((employee) => (<li key={employee.id}
            >{employee.firstname} {employee.lastname}</li>))} 
        </ol>
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
