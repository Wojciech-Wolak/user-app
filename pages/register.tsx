import React, { useState } from 'react'
import Container from 'components/Container/Container'
import Link from 'next/link'

const RegisterPage = () => {
    const [inputs, setInputs] = useState<{login:string, password:string, confirmPassword:string, email:string}>({
        login: "",
        password: "",
        confirmPassword: "",
        email: "",
    })

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(inputs),
        }).then(res => res.json()).then(data => console.log(data))
    }

  return (
    <Container className='register'>
        <form className='register__form' onSubmit={handleRegister}>
            <h2 className='register__heading'>Sign Up</h2>
            <input 
                className='register__input register__input--login' 
                onChange={(e) => setInputs(prev => ({...prev, login: e.target.value}))}
                value={inputs.login}
                name="login"
                placeholder="Login"
            />
            <input 
                className='register__input register__input--email' 
                onChange={(e) => setInputs(prev => ({...prev, email: e.target.value}))}
                value={inputs.email}
                name="email"
                placeholder="E-mail"
            />
            <input 
                className='register__input register__input--password' 
                onChange={(e) => setInputs(prev => ({...prev, password: e.target.value}))}
                value={inputs.password}
                name="password"
                placeholder="Password"
            />
            <input 
                className='register__input register__input--confirmPassword' 
                onChange={(e) => setInputs(prev => ({...prev, confirmPassword: e.target.value}))}
                value={inputs.confirmPassword}
                name="confirmPassword"
                placeholder="Confirm Password"
            />
            <button 
                className='register__button' 
                type="submit"
            >
                Sign Up
            </button>
            <Link className='register__link' href="/login">Do have an account?</Link>
        </form>
    </Container>
  )
}

export default RegisterPage