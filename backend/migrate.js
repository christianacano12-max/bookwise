import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("render.com")
    ? { rejectUnauthorized: false }
    : false,
});

async function main() {
  await client.connect();

  const schema = fs.readFileSync(
    path.join(__dirname, "schema.sql"),
    "utf8"
  );

  const seed = fs.readFileSync(
    path.join(__dirname, "seed.sql"),
    "utf8"
  );

  await client.query(schema);
  await client.query(seed);

  const result = await client.query(
    "SELECT COUNT(*) AS count FROM books"
  );

  console.log(
    `DATABASE READY - ${result.rows[0].count} BOOKS AVAILABLE`
  );

  await client.end();
}

main().catch(async (error) => {
  console.error("MIGRATION ERROR:", error);
  try {
    await client.end();
  } catch {}
  process.exit(1);
});