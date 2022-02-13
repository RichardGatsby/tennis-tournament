import pg from "pg";

//TODO: fix this to work with all envs :))
//This for production
const pool = new pg.Pool({
  ssl: {
    rejectUnauthorized: false,
  },
});

//Use this for local development
//const pool = new pg.Pool()

/**
 * Query the database using the pool
 * @param {*} query
 * @param {*} params
 *
 */
export async function query(query: string, params?: any) {
  const { rows, fields } = await pool.query(query, params);
  return rows;
}
