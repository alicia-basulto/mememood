// pages/api/save-file.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST') {

    console.log("Post done")

    res.status(200).json({ message: 'File previed successfully!' })

  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }

}
