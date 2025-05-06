import { useState, useRef, useEffect, FormEvent } from "react"
import { nanoid } from "nanoid"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { isAxiosError, AxiosResponse } from "axios"

const EMPLOYEES_URL = '/employees'

interface SubmitResponse {
    response: string
}

//Will need to mess with the employee data etc!`

//Maybe make an internal registeration system? //have to mess with the backend? Or change to users later?

const AddEmployee = () => {
    const errRef = useRef<HTMLInputElement>(null)
    const userRef = useRef<HTMLInputElement>(null)
    const axiosPrivate = useAxiosPrivate()
    const [ employeeName, setEmployeeName ] = useState('')
    const [ errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [employeeName])

    //Using AxioPrivate  hook here - ts does not like it! 
    //Might mnake a pop up here! To show that the new employee has been added? Plus a option to add a new one and a route to the view employees too! 
    const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        const employee = {name: employeeName, id: nanoid}
        try {
            const response: AxiosResponse<SubmitResponse> = await axiosPrivate.post(EMPLOYEES_URL,
                employee
            )
            console.log(response)
            setEmployeeName('')
        } catch(err: unknown) {
            if(isAxiosError(err)) {
                if(!err.response) {
                    setErrMsg('No Server Response.')
                }  
                else if (err.response.status === 400) {
                    setErrMsg("Employee Name Required.")
                } 
                else if (err.response.status === 401) {
                    setErrMsg("Unauthorised Command.")
                }}
            errRef.current?.focus()
            } 
    }

  return (
    <>
        <h1>Add New User</h1>

        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive">{errMsg}</p>

        <form className="loginForm">
            <label htmlFor="employeeName">Add Employess Name:</label>
            <input 
            onSubmit={handleSubmit}
            ref={userRef}
            className="username"
            type="text"
            required
            id="employeeName"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}/>
            <button>Add</button>
        </form>
    </>
  )
}

export default AddEmployee
