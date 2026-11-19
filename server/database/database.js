
import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

// Neon PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Handle unexpected database pool errors
pool.on("error", (error) => {
  console.error("Unexpected database pool error:", error.message);
});

export default pool;
