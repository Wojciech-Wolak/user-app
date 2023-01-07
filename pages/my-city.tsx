import { useQuery } from 'react-query'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import CountryTable from 'components/CoutryTable/CountryTable';
import { CityType } from 'types/City';
import Container from 'components/Container/Container';
import dynamic from 'next/dynamic';

import "leaflet/dist/leaflet.css";
import Head from 'next/head';
import { Auth } from 'aws-amplify';
import InfoTile from 'components/InfoTile/InfoTile';

const getCountryInfo = async (id: string) => {
  if(!id){
    return null
  }

  const res = await fetch("/api/get-location", {
    method:"POST",
    body: JSON.stringify({ id })
  })

  const data = await res.json();

  return data
}

const CityPage = () => {
  const [userCityId, setUserCityId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("")
  const router = useRouter()

  const { data, error, isLoading } = useQuery<{status: 'string', result: CityType}>([userCityId, 'city-info'], () => getCountryInfo(userCityId!))

  useEffect(()=>{
    Auth.currentAuthenticatedUser().then(user => {
      Auth.userAttributes(user).then(attrs => {
        const cityAttribute = attrs.find(attr => attr.Name === 'custom:city')

        if(!cityAttribute?.Value){
          setErrorMsg("No default city selected")
          return
        }

        setUserCityId(JSON.parse(cityAttribute?.Value).id)
      }).catch(err =>{
        setErrorMsg(err.toString());
      })
    }).catch(err => {
      setErrorMsg(err.toString());
    })
  }, [])

  if(isLoading || !data){
    return <h1>Loading...</h1>
  }

  if(errorMsg){
    return (
        <Container className='my-city__errorContainer'>
            <InfoTile title="Something went wrong">
              {errorMsg}
            </InfoTile>
        </Container>
    )
  }

  if(error){
    return <div>
      <h2>Something went wrong</h2>
    </div>
  }

  const Map = dynamic(()=>import("components/Map/Map"));
  const WeatherCharts = dynamic(()=>import("components/WeatherCharts/WeatherCharts"));

  return (
    <div>
      <Head>
        <title>{data.result.name}</title>
      </Head>
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
