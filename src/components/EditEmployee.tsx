import { useState, useRef, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { isAxiosError } from "axios"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useData from "../hooks/useData"


const EMPLOYEES_URL = '/employees'

const EditEmployee = () => {
    const { employees } = useData()
    const userRef = useRef<HTMLInputElement>(null) 
    const errRef = useRef<HTMLInputElement>(null)   
    const [ name, setName ] = useState('')
    const [ errMsg, setErrMsg ] = useState('')
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const { id } = useParams()

    const employee = employees.find(employee => employee.id === id)
    const employeeName = employee?.name

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [name])

    const handleDelete =  async () => {
        try{
            const response:string = await axiosPrivate.delete(`${EMPLOYEES_URL}/${id}`,
            )
            console.log(response)
            navigate('/employees')
        } catch(err: unknown) {
            if(isAxiosError(err)) {
                if(!err.response) {
                    setErrMsg('No Server Response.')
                } 
                else if (err.response.status === 401) {
                    setErrMsg('Unauthorised Command')
                }
            }
        }} 

    const handleEdit = async () => {
        const editiedEmployee = {name, id}
        try {
            const response = await axiosPrivate.put(`${EMPLOYEES_URL}/${id}`, editiedEmployee)
            console.log(response)
            navigate('/employess')
        } catch(err: unknown) {
            if(isAxiosError(err)) {
                if(!err.response) {
                    setErrMsg('No Server Response.')
                } 
                else if (err.response.status === 401) {
                    setErrMsg('Unauthorised Command')
                }
            }
        errRef.current?.focus()
        }} 


  return (
    <>
        <h1>Edit Employee: {employeeName}</h1>

        <section>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleEdit}>
                <label htmlFor="employeeName">Employee Name:</label>
                <input
                ref={userRef}
                id="employeeName"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                />

                <button>Save</button>
            </form>
            <button
            onChange={handleDelete}
            >Delete Employee</button>
        </section>
    </>
  )
}

export default EditEmployee

