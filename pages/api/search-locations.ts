
import type { NextApiRequest, NextApiResponse } from 'next'
import { SearchResultType } from 'types/City'

export type LocationResponse = {
    status: string
    message?: string
    results?: SearchResultType[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationResponse>
) {
    const { searchValue } = JSON.parse(req.body)

    if (!searchValue) {
        res.status(400).json({ status: "error", message: "Bad body value. Add search to request body." })
    }

    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchValue}`
    );

    const data = await response.json()

    res.status(200).json({ status:"success", results: data.results })
}


/**
 * 
 * import { SearchResponseType } from "../components/Search/Search.types";

export const fetchLocationData = async (
  searchValue?: string
): Promise<SearchResponseType> => {
  if (!searchValue) {
    throw new Error("Wpisz odpowiednią wartość");
  }

  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${searchValue}`
  );

  return await res.json();
};

 */