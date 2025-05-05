import { useState, useRef, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { isAxiosError, AxiosResponse } from "axios"

const EMPLOYEES_URL = '/employees'

interface SubmitResponse {
    response: string
}


//Maybe make an internal registeration system? //have to mess with the backend? Or change to users later?

const AddEmployee = () => {
    const errRef = useRef()
    const userRef = useRef()
    const axiosPrivate = useAxiosPrivate()
    const [ employee, setEmployee ] = useState('') //Maybe need more complex userdata 
    const [ errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [employee])

    //Using AxioPrivate  hook here - ts does not like it! 
    //Might mnake a pop up here! To show that the new employee has been added? Plus a option to add a new one and a route to the view employees too! 
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response: AxiosResponse<SubmitResponse> = await axiosPrivate.post(EMPLOYEES_URL,
                JSON.stringify(employee), {
                    headers: {'Content-Type':'application/json'},
                    withCredentials: true
                }     
            )
            console.log(response)
            setEmployee('')
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
            errRef.current.focus()
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
            ref={useRef}
            className="username"
            type="text"
            required
            id="employeeName"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}/>
            <button>Add</button>
        </form>
    </>
  )
}

export default AddEmployee
