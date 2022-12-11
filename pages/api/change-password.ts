// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Auth } from 'aws-amplify';

type DataResponse = {
    status: string;
    message?: string;
    data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse>
) {
    const body = JSON.parse(req.body)

    try {
        await Auth.forgotPasswordSubmit(body.email, body.code, body.password)

        res.status(200).json({ status: 'success' })
    } catch (err) {
        // @ts-ignore
        if(err?.name){
            // @ts-ignore
            res.status(400).json({ status: 'error', message: `Something went wrong :( ${err.name}` })
        }else {
            res.status(400).json({ status: 'error', message: `Something went wrong :( ` })
        }
    }
}
