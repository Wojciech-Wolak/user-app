import { useQuery } from 'react-query'
import { useRouter } from 'next/router';
import React from 'react'
import CountryTable from 'components/CoutryTable/CountryTable';
import { CityType } from 'types/City';
import Container from 'components/Container/Container';
import dynamic from 'next/dynamic';

import "leaflet/dist/leaflet.css";
import Head from 'next/head';

const getCountryInfo = async (id: string) => {
  const res = await fetch("/api/get-location", {
    method:"POST",
    body: JSON.stringify({ id })
  })

  const data = await res.json();

  return data
}

const CityPage = () => {
  const router = useRouter()

  const { data, error, isLoading } = useQuery<{status: 'string', result: CityType}>([router.query.id, 'city-info'], () => getCountryInfo(router.query.id as string))

  if(isLoading && !data){
    return <h1>Loading...</h1>
  }

  if(error || !data?.result){
    return <div>
      <pre>
        {JSON.stringify(error, null, 2)}
      </pre>
    </div>
  }

  const Map = dynamic(()=>import("components/Map/Map"))
  const WeatherCharts = dynamic(()=>import("components/WeatherCharts/WeatherCharts"))

  return (
    <div>
      <Head>
        <title>{data.result.name}</title>
      </Head>
      <Container className='city__signDefault'>
        <button className='city__signDefaultButton'>Sign as default city ✅</button>
      </Container>
      <Container className='city__wrapper'>
        <CountryTable country={data.result} />
        <Map lng={data.result.longitude} lat={data.result.latitude} />
      </Container>
      <Container>
        <WeatherCharts lng={data.result.longitude} lat={data.result.latitude} />
      </Container>
    </div>
  )
}

export default CityPage
