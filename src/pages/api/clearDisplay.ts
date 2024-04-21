// pages/api/playMeme.js
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string[]>,
) {
    if (req.method === 'GET') {
        console.log('Clear display:');
        // Implement your meme playing logic here
        res.status(200).end();
    } else {
        res.status(405).end();
    }
}
