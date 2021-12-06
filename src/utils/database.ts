import { Pool } from "pg";

let conn: any;

if (!conn) {
  conn = new Pool({
    user: "postgres",
    password: "19570744",
    host: "localhost",
    port: 5432,
    database: "next_tasks",
  });
}

export { conn };
