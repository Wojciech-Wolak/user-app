// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from "node-fetch"

type Data = {
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const content = JSON.parse(req.body)

  const response = await fetch(`https://api.airtable.com/v0/${content.baseID}/Tasks`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        records: [
            {
                id: content.id,
                fields: {
                  Done: content.done
                }
            }
        ]
    })
  })

  const data = await response.json()

  res.status(200).json({ data })
}
