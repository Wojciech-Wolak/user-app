import React, { useState } from 'react'
import Container from 'components/Container/Container'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'

const LoginPage = () => {
    const router = useRouter()

    const [errorMsg, setErrorMsg] = useState<string>("")
    const [inputs, setInputs] = useState<{email:string, password:string}>({
        email: "",
        password: "",
    })

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const user = await Auth.signIn(inputs.email, inputs.password);

            if(user.username){
                router.push("/")
                Auth.userAttributes(user).then(res => {
                    if(!res.find(el => el.Name === "custom:airtable")){
                        fetch("/api/create-base", {
                            method: "POST",
                            body: JSON.stringify({
                                email: inputs.email
                            })
                        }).then(res => {
                            return res.json()
                        }).then(({data}) => {
                            Auth.updateUserAttributes(user, {
                                "custom:airtable": JSON.stringify({...Object.fromEntries(data.tables.map((table: {name:string, id:string}) => [table.name, table.id])), baseID: data.id})
                            })
                        })
                    }
                })
            }
          } catch (err) {
            setErrorMsg(err?.toString().replace(/([a-zA-Z]+:)/g, "") || "Something went wrong");
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
                type="password"
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