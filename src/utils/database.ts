import { Pool } from "pg";

let conn: any;

if (!conn) {
  conn = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
  });
}

export { conn };
