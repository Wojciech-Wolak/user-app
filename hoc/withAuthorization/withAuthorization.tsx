import Container from 'components/Container/Container'
import InfoTile from 'components/InfoTile/InfoTile'
import { routes } from 'config/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Amplify } from 'aws-amplify'
import React, { useEffect, useState } from 'react'

const withAuthorization = <T extends object>(Component: React.ComponentType<T>) => {

  return function Hoc(props: T) {
    Amplify.configure({
      Auth: {
        identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
        region: process.env.AWS_MY_REGION,
        userPoolId: process.env.AWS_USER_POOL_ID,
        userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
        mandatorySignIn: false,
      },
      ssr: true,
    });
    const { pathname } = useRouter()
    const [isLogged, setIsLogged] = useState<boolean>(false)

    const checkUser = async () => {
        const res = await fetch("/api/get-session")
        const data = await res.json()

        if(data.status === 'success'){
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    }

    useEffect(()=> {
        if(pathname){
            checkUser()
        }
    }, [pathname])

    if(!isLogged && routes.find(el => pathname === (el.path))?.requireLogin){
        return (
            <Container className='notLoggedInfo'>
                <InfoTile title='You are not logged in!'>
                    <p className='notLoggedInfo__message'>
                        Please <Link href="/login">Log in</Link> 
                        {" "} or <Link href="/register">Create an account</Link>
                    </p>
                </InfoTile>
            </Container>
        )
      }

    return(
        <Component {...props} />
    )
  }
}

export default withAuthorization