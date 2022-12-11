import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from 'components/Header/Header'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Amplify, Hub } from 'aws-amplify'
import withAuthorization from 'hoc/withAuthorization/withAuthorization'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  Amplify.configure({
    Auth: {
      identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
      region: process.env.AWS_REGION,
      userPoolId: process.env.AWS_USER_POOL_ID,
      userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
      mandatorySignIn: false,
    },
    ssr: true,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
  
}

export default withAuthorization(App);