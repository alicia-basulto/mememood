// pages/api/playMeme.js
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string[]>,
) {
    if (req.method === 'GET') {
        const { gifs,loop } = req.query;
        console.log('Playing memes:', gifs,loop);
        // Implement your meme playing logic here
        res.status(200).end();
    } else {
        res.status(405).end();
    }
}
