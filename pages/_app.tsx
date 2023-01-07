import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from 'components/Header/Header'
import { QueryClientProvider, QueryClient } from 'react-query'
import withAuthorization from 'hoc/withAuthorization/withAuthorization'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { routes, RouteType } from 'config/routes'
import Head from 'next/head'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  const [actualRoute, setActualRoute] = useState<RouteType | undefined>(undefined)
  const router = useRouter()

  useEffect(()=>{
    setActualRoute(routes.find(route => route.path === router.pathname))
  }, [router.pathname])

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        {actualRoute?.name ? <title>{actualRoute.name}</title> : null}
      </Head>
      <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
  
}

export default withAuthorization(App);