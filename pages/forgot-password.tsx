import { Auth } from 'aws-amplify'
import Container from 'components/Container/Container'
import Form from 'components/Form/Form'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { UserForgotPasswordCodeFields, UserForgotPasswordEmailFields } from 'types/User'

const ForgotPassword = () => {
    const router = useRouter()
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [inputs, setInputs] = useState<UserForgotPasswordEmailFields>({
        email: "",
    })
    const [codeInputs, setCodeInputs] = useState<UserForgotPasswordCodeFields>({
        code: "",
    })

    const forgotPasswordEmailFields: React.ComponentProps<typeof Form<keyof UserForgotPasswordEmailFields>>['fields'] = [
        { name: "email", label: "E-mail", type: "email" },
    ]

    const forgotPasswordCodeFields: React.ComponentProps<typeof Form<keyof UserForgotPasswordCodeFields>>['fields'] = [
        { name: "code", label: "Your code", type: "text" },
    ]

    const sendCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await Auth.forgotPassword(inputs.email)
    
            setIsValidEmail(true)
        } catch (err) {
            setErrorMsg(err?.toString().replace(/([a-zA-Z]+:)/g, "") || "Something went wrong");
        }
    }

    const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(codeInputs.code.length && inputs.email.length){
            router.push(`/new-password?email=${inputs.email}&code=${codeInputs.code}`)
        }else {
            setErrorMsg("Please pass valid code value from your email box")
        }
    }

    if(isValidEmail){
        return (
            <Container className='forgotPassword'>
                <Form<keyof UserForgotPasswordCodeFields>
                    fields={forgotPasswordCodeFields}
                    errorMsg={errorMsg}
                    heading="Pass the code value"
                    handleChange={(key, value) => setCodeInputs(prev => ({...prev, [key]: value }))}
                    handler={changePassword}
                    inputs={codeInputs}
                    buttons={[
                        { content: "Change Password", type: "submit" }
                    ]}
                />
            </Container>
        )
    }

  return (
    <Container className='forgotPassword'>
        <Form<keyof UserForgotPasswordEmailFields>
            fields={forgotPasswordEmailFields}
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