import Container from 'components/Container/Container'
import InfoTile from 'components/InfoTile/InfoTile'
import { routes } from 'config/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Amplify, Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'

const withAuthorization = <T extends object>(Component: React.ComponentType<T>) => {

   

  return function Hoc(props: T) {
            Amplify.configure({
                Auth: {
                  region: process.env.NEXT_PUBLIC_AWS_MY_REGION,
                  userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
                  userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
                  mandatorySignIn: false,
                },
                ssr: true,
              });
    
    const { pathname } = useRouter()
    const [isLogged, setIsLogged] = useState<boolean>(false)

    const checkUser = async () => {
            Auth.currentSession().then(res => {
                if(res.getAccessToken()){
                    setIsLogged(true)
                }else{
                    setIsLogged(false)
                }
            }).catch(err=>{
                setIsLogged(false)
            })
            
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