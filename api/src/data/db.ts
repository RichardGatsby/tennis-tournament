import pg from "pg";

const pool =
  process.env.NODE_ENV !== "production"
    ? new pg.Pool()
    : new pg.Pool({
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
