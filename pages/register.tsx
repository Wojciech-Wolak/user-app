import React, { useState } from 'react'
import Container from 'components/Container/Container'
import Link from 'next/link'
import { RSC_MODULE_TYPES } from 'next/dist/shared/lib/constants'
import { useRouter } from 'next/router'

const RegisterPage = () => {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [inputs, setInputs] = useState<{login:string, password:string, confirmPassword:string, email:string}>({
        login: "",
        password: "",
        confirmPassword: "",
        email: "",
    })

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(inputs),
        })

        const data = await res.json();

        if(data.status === 'success'){
            router.push("/login")
        }else {
            setErrorMsg(data.message)
        }
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
            {errorMsg ? <p className='register__errorMsg'>{errorMsg}</p>:null}
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