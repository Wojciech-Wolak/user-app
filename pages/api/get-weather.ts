
import type { NextApiRequest, NextApiResponse } from 'next'
import { WeatherResponseType } from 'types/Weather'

export type LocationResponse = {
    status: string
    message?: string
    result?: WeatherResponseType
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationResponse>
) {
    const { lat, lng } = JSON.parse(req.body)

    if (!lat || !lng) {
        res.status(400).json({ status: "error", message: "Please, add latitude and longitude to request body!" })
    }

    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m&hourly=rain&hourly=snowfall&hourly=snow_depth&hourly=weathercode&hourly=visibility&hourly=windspeed_10m&hourly=winddirection_10m`
    );

    const data: WeatherResponseType = await response.json()

    res.status(200).json({ status:"success", result: data })
}
