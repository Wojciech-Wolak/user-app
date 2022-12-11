// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Auth } from 'aws-amplify';
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  status: string;
  message?: string;
  user?: any
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const body = JSON.parse(req.body)

  try {
    const user = await Auth.signIn(body.email, body.password);
    console.log(user)
    Auth.updateUserAttributes(user, {})
    res.status(200).json({ status: 'success', user })
  } catch (err) {
    res.status(400).json({ status: 'error', data: err })
  }

}
