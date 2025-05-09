import { useState, useRef, useEffect, FormEvent } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { isAxiosError, AxiosResponse } from "axios"
import { Link } from "react-router"



interface SubmitResponse {
    response: string
} 

//Will need to mess with the employee data etc!`

//Maybe make an internal registeration system? //have to mess with the backend? Or change to users later?

const AddEmployee = () => {
    const errRef = useRef<HTMLInputElement>(null)
    const userRef = useRef<HTMLInputElement>(null)
    const axiosPrivate = useAxiosPrivate()
    const [ firstname, setFirstname ] = useState('')
    const [ lastname, setLastname] = useState('')
    const [ errMsg, setErrMsg] = useState('')
    const [ succuess, setSuccess ] = useState(false)

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [firstname, lastname])

    //Using AxioPrivate  hook here - ts does not like it! 
    //Might mnake a pop up here! To show that the new employee has been added? Plus a option to add a new one and a route to the view employees too! 
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!firstname) {
            setErrMsg('Please enter a value for firstname.')
        } else if (!lastname) {
            setErrMsg('Please enter a value for lastname.')
            return
        }

        try {
            const response: AxiosResponse<SubmitResponse> = await axiosPrivate.post('/employees',
                JSON.stringify({firstname: firstname, lastname: lastname}), 
                {headers: {'Content-Type': 'application/json'},
                 withCredentials: true
                }
            )
            console.log(response)
            setFirstname('')
            setLastname('')
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
            } finally{setSuccess(true)}
    }

  return (
    <>  
        {succuess ? (
            <section>
                <h1>Employee Successfully submitted</h1>
                <p><Link to='/employees'>View Employees</Link></p>
                <p><Link to='/addEmployee'>Add more Employees</Link></p>
            </section>
        ) : (
        
        <section>
            <h1>Add New Employee</h1>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">{errMsg}</p>

            <form className="loginForm"
            onSubmit={handleSubmit}>
                <label htmlFor="firstname">Add Firstname:</label>
                <input 
                ref={userRef}
                className="username"
                type="text"
                required
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}/>

                <label htmlFor="lastname">Add Firstname:</label>
                <input 
                ref={userRef}
                className="username"
                type="text"
                required
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}/>

                <button>Add</button>
            </form> 

            <p><Link to='/'>Home</Link></p>
            <p><Link to='/employees'>View Employees</Link></p>
        </section>)}
        
    </>
  )
}

export default AddEmployee
