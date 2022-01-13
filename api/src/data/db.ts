

import pg from "pg";
const pool = new pg.Pool()


/**
 * Query the database using the pool
 * @param {*} query 
 * @param {*} params 
 * 
 */
export async function query(query: string, params?: any) {
    const {rows, fields} = await pool.query(query, params);
    return rows;
}