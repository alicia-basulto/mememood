// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const execSync = require('child_process').execSync;
  const output = execSync('ls out/memes', { encoding: 'utf-8' });  
  res.status(200).json({ name: "memes/defaultMeme.gif" });
}
