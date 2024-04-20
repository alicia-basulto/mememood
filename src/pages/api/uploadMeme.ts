import type { NextApiRequest, NextApiResponse } from "next";


 export type DataStorage = {
    totalStorage: number;
    usageStorage: number;
  }
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataStorage>,
) {
  
    let capacity: DataStorage = {totalStorage: 32.0, usageStorage: 8.0};
    res.status(200).json(capacity)
}
