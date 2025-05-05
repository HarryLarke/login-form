import { useState, useRef, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { isAxiosError } from "axios"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useData from "../hooks/useData"


const EMPLOYEES_URL = '/employees'

const EditEmployee = ({}) => {
    //Would it be easier to use hooks??
    //Could useprops and drilling? 
    const { employees } = useData()
    const userRef = useRef() 
    const errRef = useRef()   
    const [ name, setName ] = useState('')
    const [ errMsg, setErrMsg ] = useState('')
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const { id } = useParams()

    const employeeName = employees.find(employees.id == id)
    //Make a wawy to find the employee name! 
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
            const response = await axiosPrivate.put(`${EMPLOYEES_URL}/${id}`, {name})
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
                required
                value={employeeName}
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

