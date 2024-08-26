import pg from "pg";

// Initialize PostgreSQL client
export const pool = new pg.Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
});
