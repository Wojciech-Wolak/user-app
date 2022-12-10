import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from 'components/Header/Header'
import { QueryClientProvider, QueryClient } from 'react-query'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Container from 'components/Container/Container'
import Link from 'next/link'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(()=>{
    const user = localStorage.getItem("user");

    if(user) {
      setIsLogged(true)
    }
  }, [router])

  if(!isLogged && !router.pathname.includes("login") && !router.pathname.includes("register")){
    return (
      <>
        <Header />
        <Container>
          <h1>You are not logged in!</h1>
          <p>Please <Link href="/login">Log in</Link> or <Link href="/register">Create an account</Link></p>
        </Container>
      </>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
  
}
