// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  status: string;
  message?: string;
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const body = JSON.parse(req.body)

  const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_USERS_BASE}/Users?maxRecords=1&view=Grid%20view&filterByFormula=AND({Email}='${body.email}',{Password}='${body.password}')&fields=Login&fields=Email`, {
    method: "GET",
    headers:{
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json"
    },
  })

  const data = await response.json()

  if(!data.records){
    res.status(500).json({ status: 'error', message: 'Internal error' })
  }

  if(data.records.length > 0){
    res.status(200).json({ status: 'success', data: data.records[0].fields })
  }else {
    res.status(400).json({ status: 'error', message: 'No record found' })
  }

}
