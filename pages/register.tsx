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
    const [inputs, setInputs] = useState<UserRegisterFields>({
        nickname: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmPassword: "",
        email: "",
        birthdate: ''
    })
    const [verificationInputs, setVerificationInputs] = useState<UserVerificationFields>({
        code: ""
    })

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const registerRes = await Auth.signUp({
            password: inputs.password,
            username: inputs.email,
            attributes: {
              email: inputs.email,
              nickname: inputs.nickname,
              given_name: inputs.firstname + inputs.lastname,
              birthdate: inputs.birthdate,
            },
          }).then(res => {
            console.log('register response ', res)
          }).catch(err => {
            alert("failure" + JSON.stringify(err, null, 4))
          })
        

        // const res = await fetch("/api/register", {
        //     method: "POST",
        //     body: JSON.stringify(inputs),
        // })
        // const data = await res.json();

        // if(data.status === 'success'){
        //     setIsSigned(true)
        // }else {
        //     setErrorMsg(data.message)
        // }
    }

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await fetch("/api/verify-account", {
            method: "POST",
            body: JSON.stringify({email: inputs.email, code: verificationInputs.code}),
        })
        const data = await res.json();

        if(data.status === 'success'){
            setIsSuccess(true)
        }else {
            setErrorMsg(data.message)
        }
    }

    const handleResendCode = async () => {
        const res = await fetch("/api/resend-verification-code", {
            method: "POST",
            body: JSON.stringify({email: inputs.email}),
        })
        const data = await res.json();

        if(data.status === 'success'){
            setIsSigned(true)
        }else {
            setErrorMsg(data.message)
        }
    }

    const registerFields: React.ComponentProps<typeof Form<keyof UserRegisterFields>>['fields'] = [
        {name: "nickname", label:"Nickname", type: "text"},
        {name: "firstname", label:"First name", type: "text"},
        {name: "lastname", label:"Last name", type: "text"},
        {name: "email", label:"E-mail", type: "email"},
        {name: "password", label:"Password", type: "password"},
        {name: "confirmPassword", label:"Confirm Password", type: "password"},
        {name: "birthdate", label:"Birth Date", type: "date"},
    ]

    const verificationFields: React.ComponentProps<typeof Form<keyof UserVerificationFields>>['fields'] = [
        {name: "code", label:"Verification Code", type: "text", },
    ]

    if(isSuccess){
        return (
            <Container>
                Success!!!!11
                <button onClick={()=>router.push("/login")}>Go to login page</button>
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
        <Form<keyof UserRegisterFields> 
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