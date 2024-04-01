import type { NextApiRequest, NextApiResponse } from "next";


  export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    // Access the query parameter
    const { nameMeme } = req.query;
  
    console.log(`Name: ${nameMeme}`);
  
    res.status(200).end();
  }