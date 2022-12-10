import React from 'react';
import { WeatherChartsProps } from './WeatherCharts.types';
import { useQuery } from 'react-query';
import { AxisOptions, Chart } from 'react-charts';
import { WeatherResponseType } from 'types/Weather'
import dynamic from 'next/dynamic';

const WeatherCharts = ({ lat, lng }: WeatherChartsProps) => {
    const getWeatherForLocation = async () => {
        const res = await fetch("/api/get-weather", {
            method: "POST",
            body: JSON.stringify({
                lat,
                lng
            })
        })

        return await res.json()
    }

    const {isLoading, error, data} = useQuery<{result: WeatherResponseType}>(['wather-api', lat, lng ], getWeatherForLocation);

    const primaryAxis = React.useMemo((): AxisOptions<{date: Date}> => ({ getValue: (datum) => datum.date }), []);
    
    const secondaryAxes = React.useMemo((): AxisOptions<{date: Date, value: number}>[] => [{ getValue: (datum) => datum.value }], []);

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

    const temperatureSerie = [{
        label: "Temperature",
        data: data.result.hourly.time.map((time, idx) => {
            return ({
                date: new Date(time),
                value: data.result.hourly.temperature_2m[idx]
            })
        })
    }]

    const rainSerie = [{
        label: "Rain",
        data: data.result.hourly.time.map((time, idx) => {
            return ({
                date: new Date(time),
                value: data.result.hourly.rain[idx]
            })
        })
    }]

    const snowfallSerie = [{
        label: "Snowfall",
        data: data.result.hourly.time.map((time, idx) => {
            return ({
                date: new Date(time),
                value: data.result.hourly.snowfall[idx]
            })
        })
    }]

    const snowdepthSerie = [{
        label: "Snow depth",
        data: data.result.hourly.time.map((time, idx) => {
            return ({
                date: new Date(time),
                value: data.result.hourly.snow_depth[idx]
            })
        })
    }]

    const visibilitySerie = [{
        label: "Visibility",
        data: data.result.hourly.time.map((time, idx) => {
            return ({
                date: new Date(time),
                value: data.result.hourly.visibility[idx]
            })
        })
    }]

    const windspeedSerie = [{
        label: "Wind speed",
        data: data.result.hourly.time.map((time, idx) => {
            return ({
                date: new Date(time),
                value: data.result.hourly.windspeed_10m[idx]
            })
        })
    }]

  return (
    <div className='weatherChart'>
        <div className='weatherChart__row'>
            <div className='weatherChart__col'>
                <h2>Temperature ({data.result.hourly_units.temperature_2m})</h2>
                <Chart
                    className='chart'
                    options={{
                        data: temperatureSerie,
                        primaryAxis,
                        secondaryAxes,
                    }}
                />
            </div>
            <div className='weatherChart__col'>
                <h2>Rain ({data.result.hourly_units.rain})</h2>
                <Chart
                    className='chart'
                    options={{
                        data: rainSerie,
                        primaryAxis,
                        secondaryAxes,
                    }}
                />
            </div>
        </div>
        <div className='weatherChart__row'>
            <div className='weatherChart__col'>
                <h2>Snowfall ({data.result.hourly_units.snowfall})</h2>
                <Chart
                    className='chart'
                    options={{
                        data: snowfallSerie,
                        primaryAxis,
                        secondaryAxes,
                    }}
                />
            </div>
            <div className='weatherChart__col'>
                <h2>Snow depth ({data.result.hourly_units.snow_depth})</h2>
                <Chart
                    className='chart'
                    options={{
                        data: snowdepthSerie,
                        primaryAxis,
                        secondaryAxes,
                    }}
                />
            </div>
        </div>
        <div className='weatherChart__row'>
            <div className='weatherChart__col'>
                <h2>Visibility ({data.result.hourly_units.visibility})</h2>
                <Chart
                    className='chart'
                    options={{
                        data: visibilitySerie,
                        primaryAxis,
                        secondaryAxes,
                    }}
                />
            </div>
            <div className='weatherChart__col'>
                <h2>Wind speed ({data.result.hourly_units.windspeed_10m})</h2>
                <Chart
                    className='chart'
                    options={{
                        data: windspeedSerie,
                        primaryAxis,
                        secondaryAxes,
                    }}
                />
            </div>
        </div>
    </div>
  )
}

export default WeatherCharts