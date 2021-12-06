import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from 'src/utils/database'

type Data = {
  message: string;
  time: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const response = await conn.query('SELECT NOW()')
  const time = response.rows[0].now
  res.status(200).json({ message: "ping", time });
}
