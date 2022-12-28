import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from 'components/Header/Header'
import { QueryClientProvider, QueryClient } from 'react-query'
import withAuthorization from 'hoc/withAuthorization/withAuthorization'
import { Amplify, Auth } from 'aws-amplify'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  Amplify.configure({
      Auth: {
        identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_POOL_ID,
        region: process.env.NEXT_PUBLIC_AWS_MY_REGION,
        userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
        userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
        mandatorySignIn: false,
      },
      ssr: true,
    });
    Auth.configure({
      Auth: {
          identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_POOL_ID,
          region: process.env.NEXT_PUBLIC_AWS_MY_REGION,
          userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
          userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
          mandatorySignIn: false,
        },
        ssr: true,
    })

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
  
}

export default withAuthorization(App);