import React, { useState } from 'react'
import Container from 'components/Container/Container'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Amplify, Auth } from 'aws-amplify'

const LoginPage = () => {
    Amplify.configure({
        Auth: {
          identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
          region: process.env.AWS_REGION,
          userPoolId: process.env.AWS_USER_POOL_ID,
          userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
          mandatorySignIn: false,
        },
        ssr: true,
      });
      Auth.configure({
        Auth: {
            identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
            region: process.env.AWS_REGION,
            userPoolId: process.env.AWS_USER_POOL_ID,
            userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
            mandatorySignIn: false,
          },
          ssr: true,
      })

    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [inputs, setInputs] = useState<{email:string, password:string}>({
        email: "",
        password: "",
    })

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: inputs.email,
                password: inputs.password,
            })
        })

        const data = await res.json();

        if(data.status === "success"){
            console.log("data ", data)

            fetch("/api/get-session", {
                method: "GET",
            })
            .then(res => res.json())
            .then(data=> console.log(data))
            // localStorage.setItem('user', JSON.stringify(data.data))
            // router.push("/")
        }else {
            setErrorMsg("Something went wrong")
        }
    }

  return (
    <Container className='login'>
        <form className='login__form' onSubmit={handleLogin}>
            <h2 className='login__heading'>Login</h2>
            <input 
                className='login__input login__input--email' 
                onChange={(e) => setInputs(prev => ({...prev, email: e.target.value}))}
                value={inputs.email}
                name="email"
                placeholder="Email"
            />
            <input 
                className='login__input login__input--password' 
                onChange={(e) => setInputs(prev => ({...prev, password: e.target.value}))}
                value={inputs.password}
                name="password"
                placeholder="Password"
            />
            <button 
                className='login__button' 
                type="submit"
            >
                Log in
            </button>
            {errorMsg ? <p className='login__errorMsg'>{errorMsg}</p>:null}
            <Link className='login__link' href="/register">Do not have an account?</Link>
            <Link className='login__link' href="/forgot-password">Forgot your password?</Link>
        </form>
    </Container>
  )
}

export default LoginPage