import Container from 'components/Container/Container'
import Form from 'components/Form/Form'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { UserForgotPasswordFields } from 'types/User'

const ForgotPassword = () => {
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [inputs, setInputs] = useState<UserForgotPasswordFields>({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const forgotPasswordFields: React.ComponentProps<typeof Form<keyof UserForgotPasswordFields>>['fields'] = [
        { name: "email", label: "E-mail", type: "email" },
        { name: "password", label: "Password", type: "password" },
        { name: "confirmPassword", label: "Confirm password", type: "password" },
    ]

    const sendCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

  return (
    <Container className='forgotPassword'>
        <Form<keyof UserForgotPasswordFields>
            fields={forgotPasswordFields}
            errorMsg={errorMsg}
            heading="Pass your email address"
            handleChange={(key, value) => setInputs(prev => ({...prev, [key]: value }))}
            handler={sendCode}
            inputs={inputs}
            buttons={[
                { content: "Get code", type: "submit" }
            ]}
        />
    </Container>
  )
}

export default ForgotPassword