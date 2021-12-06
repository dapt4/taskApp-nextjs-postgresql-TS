import { NextApiRequest, NextApiResponse } from "next";
import { conn } from 'src/utils/database'

export default async function task(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  switch(method){
    case 'GET':
      try {
        const queryText = 'SELECT * FROM tasks WHERE id = $1;';      
        const values = [query.id];
        const response = await conn.query(queryText,values)
        if(response.rows.length === 0){
          return res.status(404).json({message: "task not found"})
        }
        return res.status(200).json(response.rows[0])
      }catch (err: any){
        return res.status(500).json({message: err.message})
      }
    case 'PUT':
      try {
        const queryText = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *;'; 
        const { title, description } = body
        const values = [title, description, query.id];
        const response = await conn.query(queryText,values)
        if(response.rows.length === 0){
          return res.status(404).json({message: "task not found"})
        }
        return res.status(200).json(response.rows[0])
      }catch (err: any){
        return res.status(500).json({message: err.message})
      }
      return res.status(200).json('updating a unique task')
    case 'DELETE':
      try {
        const queryText = 'DELETE FROM tasks WHERE id = $1 RETURNING *;';      
        const values = [query.id];
        const response = await conn.query(queryText,values)
        if(response.rowCount === 0){
          return res.status(404).json({message: "task not found"})
        }
        return res.status(200).json(response.rows[0])
      }catch (err: any){
        return res.status(500).json({message: err.message})
      }
    default:
      return res.status(400).json('method not allowed')
  }
}
