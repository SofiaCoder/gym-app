import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthForm } from "../Form/AuthForm";

const RegisterForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [respons, setRespons] = useState('')

    const Register = async () => {
        const res = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({username, password}),
            headers: {
                'content-type': 'application/json'
            }
        })
        const data = await res.text()
        setRespons(data)
        if(res.status === 200) {
            window.location.href='/'
        }
    }
    const Submit = (e) => {
        e.preventDefault()
        Register()
    }

    const usernameSetter = (e) => setUsername(e.target.value)
    const passwordSetter = (e) => setPassword(e.target.value)

    return (
        <>
            <h1>Register</h1>
            <AuthForm 
                username={username}
                usernameSet={usernameSetter}
                password={password}
                passwordSet={passwordSetter}
                submitFunction={Submit}
                btnText="Register"                
            />
            <Link to='/'>Log in</Link>
            <h2>{respons}</h2>
        </>)
}

export default RegisterForm