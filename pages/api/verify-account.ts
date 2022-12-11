// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Auth } from 'aws-amplify';

type DataResponse = {
    status: string
    message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse>
) {
    const body = JSON.parse(req.body)

    try {
        await Auth.confirmSignUp(body.email, body.code);

        res.status(200).json({ status: 'success' })
    } catch (err) {
        res.status(400).json({ status: 'error' })
    }
}
