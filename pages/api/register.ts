// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Auth } from 'aws-amplify'
import { UserRegisterFields } from 'types/User';

type ResponseData = {
  status: string;
  message?: string;
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const body: UserRegisterFields = JSON.parse(req.body)

  if(Object.values(body).some(el => !el.length)){
    res.status(400).json({ status: 'error', message:"Please, fill all fields" })
  }

  const registerRes = await Auth.signUp({
    password: body.password,
    username: body.email,
    attributes: {
      email: body.email,
      nickname: body.nickname,
      given_name: body.firstname + body.lastname,
      birthdate: body.birthdate,
    },
  })

  if(registerRes.user){
    res.status(200).json({ status: 'success', data: registerRes })
  }else {
    res.status(400).json({ status: 'error', message:"Something went wrong" })
  }
}
