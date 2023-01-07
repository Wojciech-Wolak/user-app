// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

type Data = {
    data: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const data = JSON.parse(req.body)

    fetch(`https://api.airtable.com/v0/meta/bases`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.AIRTBLE_ACCESS_TOKEN}`,
            "Content-Type": `application/json`,
        },
        body: JSON.stringify({
            name: `base${data.email}`,
            tables: [
                {
                    name: "Tasks",
                    description: "A to-do list of places to visit",
                    fields: [
                        {
                            name: "Title",
                            type: "singleLineText"
                        },
                        {
                            name: "Date",
                            type: "singleLineText"
                        },
                        {
                            name: "Content",
                            type: "multilineText"
                        },
                        {
                            name: "Done",
                            options: {
                              color: "greenBright",
                              icon: "check"
                            },
                            type: "checkbox"
                          }
                    ],
                }
            ],
            workspaceId: "wspR2xi0ocG0uWBrJ"
        })
    }).then(response => {
        return response.json()
    }).then(data =>{
        console.log(data);
        
        res.status(200).json({data})
    }).catch(err =>{
        res.status(400).json({data: err})
    })
}
