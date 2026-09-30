import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("render.com")
    ? { rejectUnauthorized: false }
    : false,
});

async function columnExists(table, column) {
  const result = await client.query(
    `
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = $1
      AND column_name = $2
    `,
    [table, column]
  );

  return result.rowCount > 0;
}

async function main() {
  await client.connect();

  // USERS
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // BOOKS
  await client.query(`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      genre VARCHAR(100) NOT NULL,
      description TEXT DEFAULT '',
      published_year INT DEFAULT 2024,
      rating NUMERIC(3,2) DEFAULT 0,
      available_copies INT DEFAULT 1,
      cover_url TEXT DEFAULT '',
      submitted_by INT,
      is_community_recommendation BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Add missing columns individually
  const bookColumns = [
    [
      "description",
      `ALTER TABLE books ADD COLUMN description TEXT DEFAULT ''`
    ],
    [
      "published_year",
      `ALTER TABLE books ADD COLUMN published_year INT DEFAULT 2024`
    ],
    [
      "rating",
      `ALTER TABLE books ADD COLUMN rating NUMERIC(3,2) DEFAULT 0`
    ],
    [
      "available_copies",
      `ALTER TABLE books ADD COLUMN available_copies INT DEFAULT 1`
    ],
    [
      "cover_url",
      `ALTER TABLE books ADD COLUMN cover_url TEXT DEFAULT ''`
    ],
    [
      "submitted_by",
      `ALTER TABLE books ADD COLUMN submitted_by INT`
    ],
    [
      "is_community_recommendation",
      `ALTER TABLE books ADD COLUMN is_community_recommendation BOOLEAN NOT NULL DEFAULT FALSE`
    ],
  ];

  for (const [column, sql] of bookColumns) {
    if (!(await columnExists("books", column))) {
      await client.query(sql);
    }
  }

  // Favorites
  await client.query(`
    CREATE TABLE IF NOT EXISTS favorites (
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      book_id INT REFERENCES books(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, book_id)
    );
  `);

  // Reservations
  await client.query(`
    CREATE TABLE IF NOT EXISTS reservations (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      book_id INT REFERENCES books(id) ON DELETE CASCADE,
      status VARCHAR(20) DEFAULT 'waiting',
      queue_position INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Borrow history
  await client.query(`
    CREATE TABLE IF NOT EXISTS borrow_history (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      book_id INT REFERENCES books(id) ON DELETE CASCADE,
      action VARCHAR(30) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Connect submitted_by to users when possible
  await client.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'books_submitted_by_fkey'
      ) THEN
        ALTER TABLE books
        ADD CONSTRAINT books_submitted_by_fkey
        FOREIGN KEY (submitted_by)
        REFERENCES users(id)
        ON DELETE SET NULL;
      END IF;
    END $$;
  `);

  // Seed books
  const fs = await import("fs");
  const path = await import("path");
  const { fileURLToPath } = await import("url");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const seed = fs.readFileSync(
    path.join(__dirname, "seed.sql"),
    "utf8"
  );

  await client.query(seed);

  const books = await client.query(
    "SELECT COUNT(*) AS count FROM books"
  );

  const users = await client.query(
    "SELECT COUNT(*) AS count FROM users"
  );

  console.log(`DATABASE READY - ${books.rows[0].count} BOOKS AVAILABLE`);
  console.log(`USERS READY - ${users.rows[0].count}`);

  await client.end();
}

main().catch(async (error) => {
  console.error("MIGRATION ERROR:", error);

  try {
    await client.end();
  } catch {}

  process.exit(1);
});