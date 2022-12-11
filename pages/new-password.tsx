import Container from 'components/Container/Container'
import Form from 'components/Form/Form'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { UserNewPasswordFields } from 'types/User'

const ForgotPassword = () => {
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [inputs, setInputs] = useState<UserNewPasswordFields>({
        password: "",
        confirmPassword: "",
    })

    const forgotPasswordFields: React.ComponentProps<typeof Form<keyof UserNewPasswordFields>>['fields'] = [
        { name: "password", label: "Password", type: "password" },
        { name: "confirmPassword", label: "Confirm password", type: "password" },
    ]

    const sendCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

  return (
    <Container className='forgotPassword'>
        <Form<keyof UserNewPasswordFields>
            fields={forgotPasswordFields}
            errorMsg={errorMsg}
            heading="Pass your email address"
            handleChange={(key, value) => setInputs(prev => ({...prev, [key]: value }))}
            handler={sendCode}
            inputs={inputs}
            buttons={[
                { content: "Change password", type: "submit" }
            ]}
        />
    </Container>
  )
}

export default ForgotPassword