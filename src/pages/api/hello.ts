// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>,
) {
  const memes = fs.readdirSync("public/memes").map(file => {
      return "memes/"+file;
});
  res.status(200).json(memes);
}
