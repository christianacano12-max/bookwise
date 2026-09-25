CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  description TEXT DEFAULT '',
  published_year INT DEFAULT 2024,
  rating NUMERIC(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  available_copies INT DEFAULT 1 CHECK (available_copies >= 0),
  cover_url TEXT DEFAULT '',
  submitted_by INT REFERENCES users(id) ON DELETE SET NULL,
  is_community_recommendation BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE books ADD COLUMN IF NOT EXISTS submitted_by INT REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE books ADD COLUMN IF NOT EXISTS is_community_recommendation BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS favorites (
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  book_id INT REFERENCES books(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, book_id)
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  book_id INT REFERENCES books(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'waiting',
  queue_position INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS borrow_history (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  book_id INT REFERENCES books(id) ON DELETE CASCADE,
  action VARCHAR(30) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);
CREATE INDEX IF NOT EXISTS idx_books_genre ON books(genre);
CREATE INDEX IF NOT EXISTS idx_books_community ON books(is_community_recommendation);
CREATE INDEX IF NOT EXISTS idx_history_user ON borrow_history(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_book ON favorites(book_id);
CREATE INDEX IF NOT EXISTS idx_reservations_book_status ON reservations(book_id, status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_waiting_reservation_user_book
  ON reservations(user_id, book_id) WHERE status = 'waiting';
