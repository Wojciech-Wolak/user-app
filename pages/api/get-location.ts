
import type { NextApiRequest, NextApiResponse } from 'next'
import { SearchResultType } from 'types/City'

export type LocationResponse = {
    status: string
    message?: string
    result?: SearchResultType
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationResponse>
) {
    const { id } = JSON.parse(req.body)

    if (!id) {
        res.status(400).json({ status: "error", message: "Bad url value. Please add country id in url." })
    }

    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/get?id=${id}`
    );

    const data = await response.json()

    res.status(200).json({ status:"success", result: data })
}
