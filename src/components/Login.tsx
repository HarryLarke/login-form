import { FormEvent, useRef, useState, useEffect, useContext } from "react"
import { isAxiosError, AxiosResponse } from "axios"
import useAuth from "../hooks/useAuth"


import axios from '../api/axios'


const LOGIN_URL = '/auth'

interface LoginResponse {
    accessToken : string 
}

const Login = () => {

    const [ user, setUser ] = useState<string>('')
    const [ pwd, setPwd ] = useState<string>('')
    const [ errMsg, setErrMsg ] = useState<string>('')
    const { setAuth } = useAuth()

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() 
        
        try {
            const response:AxiosResponse<LoginResponse> = await axios.post(LOGIN_URL, 
                JSON.stringify({user, pwd}),
                    {
                        headers: {'Content-Type':'application/json'},
                        withCredentials: true
                    })
            console.log(JSON.stringify(response?.data))
            const accessToken:string = response?.data.accessToken
            setAuth({accessToken})
            setUser('')
            setPwd('')
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
                }
        }}
    }

  return (
    <>
        <section>
        <h1>Login Page</h1>
        {!errMsg ? <p>No Errors</p> : <p>{errMsg}</p> }
        <form className="loginForm"
            onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input type="text"
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
