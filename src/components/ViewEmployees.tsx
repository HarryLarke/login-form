import { useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { isAxiosError } from "axios"
import useData from "../hooks/useData"

//Always load employees with each component or implment context??? Redux would always be cleaner ;(

const EMPLOYEES_URL = '/employees'

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
                const response = await axiosPrivate.get(EMPLOYEES_URL, {
                    signal: controller.signal 
                })
                const employees = response.data //Will need to find the correct manner to get and display this data?
                isMounted && setEmployees(employees)
            } catch(err:unknown) {
                    if(isAxiosError(err)) {
                        console.log(err.message),
                            goBack
                     } //maybe see if can get to go back to prev??
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
        content = <ul>
            {employees.map((employee, id) => <li key={id}
            >Name:{employee}<Link to={`/employees/edit/${id}`}>Edit</Link></li>)} 
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
