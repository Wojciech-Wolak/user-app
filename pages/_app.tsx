import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from 'components/Header/Header'
import { QueryClientProvider, QueryClient } from 'react-query'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(()=>{
    const user = localStorage.getItem("user");

    if(!user && !router.pathname.includes("login")) {
      router.push("/login")
    }
  }, [router])

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
  
}
