// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Auth } from 'aws-amplify';

type DataResponse = {
    status: string
    message?: string
    data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse>
) {
    try {
        const data = await Auth.currentSession()

        res.status(200).json({ status: 'success', data })
    } catch (err) {
        res.status(400).json({ status: 'error', data: err })
    }
}
