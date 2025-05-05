import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { isAxiosError } from "axios"

const EMPLOYEES_URL = '/employees'

const EditEmployee = ({}) => {
    //Would it be easier to use hooks??
    //Could useprops and drilling? 

    const userRef = useRef() 
    const errRef = useRef()   
    const [ newName, setNewName ] = useState('')
    const [ errMsg, setErrMsg ] = useState('')
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [newName])

    //Will need to extract the ID!s
    //Will probably need to send some form of credential !!
    const handleDelete =  async () => {
        try{
            const response:string = await axiosPrivate.delete(`${EMPLOYEES_URL}/${id}`{
                withCredentials: true
            })
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
        try {
            const response = await axiosPrivate.put(`${EMPLOYEES_URL}/${id}` {name})
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
        errRef.current.focus()
        }} 


  return (
    <>
        <h1>Edit Employee</h1>

        <section>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleEdit}>
                <label htmlFor="employeeName">Employee Name:</label>
                <input
                ref={userRef}
                id="employeeName"
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

