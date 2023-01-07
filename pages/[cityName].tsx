import { useQuery } from 'react-query'
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react'
import CountryTable from 'components/CoutryTable/CountryTable';
import { CityType } from 'types/City';
import Container from 'components/Container/Container';
import dynamic from 'next/dynamic';

import "leaflet/dist/leaflet.css";
import Head from 'next/head';
import { Auth } from 'aws-amplify';

const getCountryInfo = async (id: string) => {

  const res = await fetch("/api/get-location", {
    method:"POST",
    body: JSON.stringify({ id })
  })

  const data = await res.json();

  return data
}

const CityPage = () => {
  const [isLoadingSettingCity, setIsLoadingSettingCity] = useState<boolean>(false)
  const router = useRouter()

  const { data, error, isLoading } = useQuery<{status: 'string', result: CityType}>([router.query.id, 'city-info'], () => getCountryInfo(router.query.id as string))

  const Map = dynamic(()=>import("components/Map/Map"));
  const WeatherCharts = dynamic(()=>import("components/WeatherCharts/WeatherCharts"));

  const map = useMemo(()=>{
    if(!data){
      return null
    }

    return <Map lng={data.result.longitude} lat={data.result.latitude} />
  },[Map, data])

  if(isLoading || !data){
    return <h1>Loading...</h1>
  }

  if(error){
    return <div>
      <pre>
        {JSON.stringify(error, null, 2)}
      </pre>
    </div>
  }

  const handleSignDefaultCity = () => {
    setIsLoadingSettingCity(true)
    Auth.currentAuthenticatedUser().then(user => {
      Auth.updateUserAttributes(user, {
        "custom:city": JSON.stringify({
          city: data.result.name,
          lat: data.result.latitude,
          lng: data.result.longitude,
          id: data.result.id
        })
      }).then(()=>{
        setIsLoadingSettingCity(false)
      }).catch(err => {
        console.log(err.toString())
        setIsLoadingSettingCity(false)
      })
    }).catch(err => {
      console.log(err.toString())
      setIsLoadingSettingCity(false)
    })
  }

  return (
    <div>
      <Head>
        <title>{data.result.name}</title>
      </Head>
      <Container className='city__signDefault'>
        <button className='city__signDefaultButton' disabled={isLoadingSettingCity} onClick={handleSignDefaultCity}>
          {isLoadingSettingCity ? "Setting..." : "Sign as default city ✅"}
        </button>
      </Container>
      <Container className='city__wrapper'>
        <CountryTable country={data.result} />
        {map}
      </Container>
      <Container>
        <WeatherCharts lng={data.result.longitude} lat={data.result.latitude} />
      </Container>
    </div>
  )
}

export default CityPage
