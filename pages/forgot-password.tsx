import Container from 'components/Container/Container'
import Form from 'components/Form/Form'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { UserForgotPasswordEmailFields } from 'types/User'

const ForgotPassword = () => {
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [inputs, setInputs] = useState<UserForgotPasswordEmailFields>({
        email: "",
    })

    const forgotPasswordFields: React.ComponentProps<typeof Form<keyof UserForgotPasswordEmailFields>>['fields'] = [
        { name: "email", label: "E-mail", type: "email" },
    ]

    const sendCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

  return (
    <Container className='forgotPassword'>
        <Form<keyof UserForgotPasswordEmailFields>
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