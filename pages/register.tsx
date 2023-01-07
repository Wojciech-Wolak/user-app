import React, { useState } from 'react'
import Container from 'components/Container/Container'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserRegisterFields, UserVerificationFields } from 'types/User'
import Form from 'components/Form/Form'
import { Auth } from 'aws-amplify'

const RegisterPage = () => {
    const router = useRouter();
    const [isSuccess, setIsSuccess]= useState<boolean>(false);
    const [isSigned, setIsSigned] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [inputs, setInputs] = useState<Omit<UserRegisterFields, "custom:city">>({
        nickname: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmPassword: "",
        email: "",
        birthdate: ''
    })
    const [verificationInputs, setVerificationInputs] = useState<UserVerificationFields>({
        username: "",
        code: ""
    })

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try{
            const registerRes = await Auth.signUp({
                password: inputs.password,
                username: inputs.email,
                attributes: {
                  email: inputs.email,
                  nickname: inputs.nickname,
                  given_name: inputs.firstname + inputs.lastname,
                  birthdate: inputs.birthdate,
                },
              })

              if(registerRes.codeDeliveryDetails.AttributeName){
                setVerificationInputs(prev => ({...prev, username: inputs.email}))
                setIsSigned(true)
              }
        }catch(err){
            alert("failure" + JSON.stringify(err, null, 4))
        }
    }

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await Auth.confirmSignUp(verificationInputs.username, verificationInputs.code);

            if(response === 'SUCCESS'){
                setIsSuccess(true)
            }
        } catch (err) {
            setErrorMsg(err?.toString().replace(/([a-zA-Z]+:)/g, "") || "Something went wrong");
        }
    }

    const handleResendCode = async () => {
        try{
            const response = await Auth.resendSignUp(verificationInputs.username);
            if(response.status === 'success'){
                setIsSigned(true)
            }else{

            }
        }catch(err){
            setErrorMsg(err?.toString().replace(/([a-zA-Z]+:)/g, "") || "Something went wrong")
        }
    }

    const registerFields: React.ComponentProps<typeof Form<keyof Omit<UserRegisterFields, "custom:city">>>['fields'] = [
        {name: "nickname", label:"Nickname", type: "text"},
        {name: "firstname", label:"First name", type: "text"},
        {name: "lastname", label:"Last name", type: "text"},
        {name: "email", label:"E-mail", type: "email"},
        {name: "password", label:"Password", type: "password"},
        {name: "confirmPassword", label:"Confirm Password", type: "password"},
        {name: "birthdate", label:"Birth Date", type: "date"},
    ]

    const verificationFields: React.ComponentProps<typeof Form<keyof UserVerificationFields>>['fields'] = [
        {name: "username", label:"E-mail", type: "email", },
        {name: "code", label:"Verification Code", type: "text", },
    ]

    if(isSuccess){
        return (
            <Container className='register'>
                <Form<keyof UserVerificationFields> 
                    heading='Successfully you are signed up and verified!'
                    errorMsg={errorMsg}
                    handleChange={(name, value) => setVerificationInputs(prev => ({...prev, [name]: value}))}
                    buttons={[
                        {
                            content: 'Go to login page',
                            type: 'button',
                            onClick: ()=>router.push("/login")
                        }
                    ]}
                />
            </Container>
        )
    }

    if(isSigned){
        return (
            <Container className='register'>
                <Form<keyof UserVerificationFields> 
                    heading='Verify code from your mailbox'
                    fields={verificationFields}
                    errorMsg={errorMsg}
                    handleChange={(name, value) => setVerificationInputs(prev => ({...prev, [name]: value}))}
                    handler={handleVerify}
                    inputs={verificationInputs}
                    buttons={[
                        {
                            content: 'Verify',
                            type: 'submit',
                        },
                        {
                            content: 'Resend code',
                            type: "button",
                            onClick: handleResendCode
                        }
                    ]}
                />
            </Container>
        )
    }

  return (
    <Container className='register'>
        <Form<keyof Omit<UserRegisterFields, "custom:city">> 
            heading='Sign Up'
            fields={registerFields}
            errorMsg={errorMsg}
            handleChange={(name, value) => setInputs(prev => ({...prev, [name]: value}))}
            handler={handleRegister}
            inputs={inputs}
            buttons={[
                {
                    content: 'Sign Up',
                    type: 'submit',
                },
                {
                    content: 'Do have an account?',
                    href: "/login",
                }
            ]}
        />
    </Container>
  )
}

export default RegisterPage