import Container from 'components/Container/Container'
import TasksSection from 'components/TasksSection/TasksSection'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container className='home__row'>
          <TasksSection />
          <TasksSection />
        </Container>
      </main>
    </div>
  )
}
