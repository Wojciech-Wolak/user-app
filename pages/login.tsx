import React, { useState } from 'react'
import Container from 'components/Container/Container'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LoginPage = () => {
    const router = useRouter()
    const [inputs, setInputs] = useState<{email:string, password:string}>({
        email: "",
        password: "",
    })

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: inputs.email,
                password: inputs.password,
            })
        })
    }

  return (
    <Container className='login'>
        <form className='login__form' onSubmit={handleLogin}>
            <h2 className='login__heading'>Login</h2>
            <input 
                className='login__input login__input--email' 
                onChange={(e) => setInputs(prev => ({...prev, email: e.target.value}))}
            />
            <input 
                className='login__input login__input--password' 
                onChange={(e) => setInputs(prev => ({...prev, password: e.target.value}))}
            />
            <button 
                className='login__button' 
                type="submit"
            >
                Log in
            </button>
            <Link className='login__link' href="/register">Do not have an account?</Link>
            <Link className='login__link' href="/register">Forgot your password?</Link>
        </form>
    </Container>
  )
}

export default LoginPage