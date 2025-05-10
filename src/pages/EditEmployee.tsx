import { useState, useRef, useEffect, FormEvent, MouseEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { isAxiosError, AxiosResponse } from "axios"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useData from "../hooks/useData"


interface SubmitResponse {
    response: string 
}

const EditEmployee = () => {
    const { firstname, setFirstname, lastname, setLastname } = useData()
    const userRef = useRef<HTMLInputElement>(null) 
    const errRef = useRef<HTMLInputElement>(null)   
    const [ errMsg, setErrMsg ] = useState('')
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [name])

    //A little funky, probably need to set up specific backup route for deletion on backend!!
    const handleDelete =  async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try{
            const response: AxiosResponse<Response> = await axiosPrivate.delete(`/employees`, 
                {
                    data: {id:id},
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })
        } catch(err: unknown) {
            if(isAxiosError(err)) {
                if(!err.response) {
                    setErrMsg('No Server Response.')
                } 
                else if (err.response.status === 401) {
                    setErrMsg('Unauthorised Command')
                }
            }
        }finally{
            navigate('/viewEmployees')
        }
    } 

    const handleEdit = async (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        try {
            const response: AxiosResponse<SubmitResponse> = await axiosPrivate.put(`/employees`, 
                JSON.stringify({ id:id, firstname: firstname, lastname: lastname}), 
                {headers: {'Content-Type': 'application/json'},
                 withCredentials: true
                }
            )
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
        }finally{
            navigate('/viewEmployees')
        }
    } 


  return (
    <>
        <h1>Edit Employee: {firstname}</h1>

        <section>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">{errMsg}</p>

            <form onSubmit={handleEdit}>

                <label htmlFor="firstname">Firstname:</label>
                <input
                ref={userRef}
                id="firstname"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                />

                <label htmlFor="lastname">Firstname:</label>
                <input
                ref={userRef}
                id="lastname"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                />
                <button>Save</button>
            </form>
            <button
            onClick={handleDelete}
            >Delete Employee</button>
        </section>
    </>
  )
}

export default EditEmployee

