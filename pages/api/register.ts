// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createHash } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

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

  const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_USERS_BASE}/Users`, {
    method: "POST",
    headers:{
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fields: {
        Email: body.email,
        Login: body.login,
        Password: body.password
      }
    })
  })

  const data = await response.json()

  res.status(200).json({ status: 'success', data })
}
