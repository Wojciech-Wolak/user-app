import { Auth } from 'aws-amplify'
import Container from 'components/Container/Container'
import Form from 'components/Form/Form'
import InfoTile from 'components/InfoTile/InfoTile'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { UserNewPasswordFields } from 'types/User'

const ForgotPassword = () => {
    const router = useRouter()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
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
        const { query } = router

        if(!inputs.password){
            setErrorMsg("Please pass password")
            return;
        }

        if(inputs.password !== inputs.confirmPassword){
            setErrorMsg("Password are different")
            return;
        }

        if(
            query.email && typeof query.email === 'string' 
            && query.code && typeof query.code === 'string'
        ){
            try {
                const response = await Auth.forgotPasswordSubmit(query.email.replace(" ", "+"), query.code, inputs.password)
        
                if(response === 'SUCCESS'){
                    setIsSuccess(true)
                }
            } catch (err) {
                setErrorMsg(err?.toString().replace(/([a-zA-Z]+:)/g, "") || "Something went wrong");
            }
        }else {
            setErrorMsg("Url is invalid. Please try again to change your password")
        }

    }

    if(isSuccess) {
        return (
            <Container className='forgotPassword'>
                <InfoTile title="Password changed">
                    <button 
                        className='forgotPassword__button'
                        onClick={() => router.push("/login")}
                    >
                        Go to login page
                    </button>
                </InfoTile>
            </Container>
        )
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