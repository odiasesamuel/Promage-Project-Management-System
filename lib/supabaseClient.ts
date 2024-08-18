import { createClient } from "@supabase/supabase-js";
import pg from "pg";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize PostgreSQL client
export const pool = new pg.Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
});
