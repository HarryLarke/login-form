import { useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { AxiosResponse, isAxiosError } from "axios"
import useData from "../hooks/useData"
import useAuth from "../hooks/useAuth"

//Always load employees with each component or implment context??? Redux would always be cleaner ;(
//Think it would be good to set the state of all employees, instead of the seletcted one - see how affects the name on the Edit page?

interface Employee {
    _id: string
    id: string
    firstname: string
    lastname: string
}

interface GetResponse {
    employees : Employee[]
}

const Employees = () => {
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()
    const { employees, setEmployees, setFirstname, setLastname } = useData()
    const { auth } = useAuth()

    useEffect(() => {
        if(!auth?.accessToken) return

        let isMounted = true 
        const controller = new AbortController()
        const getEmployees = async () => {
            try {
                const response: AxiosResponse<GetResponse, any> = await axiosPrivate.get('/employees', {
                    signal: controller.signal,
                    withCredentials: true
                })
                isMounted && setEmployees(response.data.employees.map(employee => ({
                    ...employee, 
                    id: employee._id
                })))
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

    }, [axiosPrivate, location, navigate, setEmployees])
    //Potentiall just map names because - don't really want ID being accessed by JS hacking!

    let content 

    if(!employees || employees.length === 0) {
        content = <p>No users to display...</p>
    }  else {
        content = <ol>
            {employees.map((employee) => (<li key={employee.id}
            >{employee.firstname} {employee.lastname}<span>
                <Link onClick={() => {setFirstname(employee.firstname), setLastname(employee.lastname)} } 
                to={`/employees/${employee.id}`}>edit</Link></span></li>))} 
        </ol>
    }

  return (
    <>
    {content}
    </>
  )
}

export default Employees