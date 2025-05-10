import { FormEvent, useRef, useState, useEffect } from "react"
import { isAxiosError, AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import axios from '../api/axios'

const LOGIN_URL = '/auth'

interface LoginResponse {
    accessToken : string 
}

const Login = () => {
    const userRef = useRef<HTMLInputElement>(null)
    const errRef = useRef<HTMLInputElement>(null) 
    const navigate = useNavigate()

    const [ user, setUser ] = useState<string>('')
    const [ pwd, setPwd ] = useState<string>('')
    const [ errMsg, setErrMsg ] = useState<string>('')
    const { setAuth } = useAuth()

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        {setErrMsg('')}
    }, [pwd, user])

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() 
        
        try {
            const response:AxiosResponse<LoginResponse> = await axios.post(LOGIN_URL, 
                JSON.stringify({user, pwd}),
                    {
                        headers: {'Content-Type':'application/json'},
                        withCredentials: true
                    })
            const accessToken: string = response?.data?.accessToken

            setAuth({user, accessToken})

            setUser('')
            setPwd('')
            navigate('/')
        } catch(err: unknown) {
            if (isAxiosError(err)) {
                if(!err.response) {
                    setErrMsg('No Server Response...')
                }   else if (err.response.status === 400) {
                    setErrMsg('Missing Username')
                } else if (err.response.status === 401) {
                    setErrMsg('Unauthorised')
                } else {
                    setErrMsg('Login Failed')
                }}
            errRef.current?.focus()
            }
    }

  return (
    <>
        <section>
        <h1>Login Page</h1>

        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
        >{errMsg}</p>

        <form className="loginForm"
            onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input type="text"
            ref={userRef}
            id="username"
            value={user}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value) }
            required/>

            <label htmlFor="password">Password</label>
            <input type="password"
            id="password"
            required
            value={pwd}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)}
            />
            <button>Login</button>
        </form>
        </section>
    </>          
  )
}

export default Login
