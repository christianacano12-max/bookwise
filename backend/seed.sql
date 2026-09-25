INSERT INTO books (title, author, genre, description, published_year, rating, available_copies, cover_url)
SELECT * FROM (VALUES
('The Silent Patient','Alex Michaelides','Mystery','A psychological mystery about a famous painter whose silence hides a disturbing secret.',2019,4.30,4,'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600'),
('Atomic Habits','James Clear','Self-Help','A practical guide to building good habits and breaking bad ones.',2018,4.80,5,'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600'),
('Dune','Frank Herbert','Science Fiction','An epic science-fiction story of politics, ecology, power, and destiny.',1965,4.70,3,'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600'),
('Pride and Prejudice','Jane Austen','Romance','A classic novel about manners, family, love, and social expectations.',1813,4.60,2,'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600'),
('The Hobbit','J.R.R. Tolkien','Fantasy','Bilbo Baggins begins an unexpected adventure across Middle-earth.',1937,4.90,4,'https://images.unsplash.com/photo-1511108690759-009324a90311?w=600'),
('Clean Code','Robert C. Martin','Technology','A guide to writing readable, maintainable software.',2008,4.50,3,'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600'),
('The Alchemist','Paulo Coelho','Fiction','A shepherd follows a dream and learns about purpose and perseverance.',1988,4.40,4,'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600'),
('The Midnight Library','Matt Haig','Fiction','Between life and death there is a library, and within that library, endless lives.',2020,4.50,4,'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=600'),
('Project Hail Mary','Andy Weir','Science Fiction','A lone astronaut must save humanity with science, courage, and an unlikely friend.',2021,4.80,3,'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600'),
('Educated','Tara Westover','Memoir','A powerful memoir about learning, family, and finding your own voice.',2018,4.70,2,'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600'),
('The Creative Act','Rick Rubin','Art & Design','A reflective guide to creativity, attention, and bringing ideas into the world.',2023,4.60,3,'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600'),
('A Brief History of Time','Stephen Hawking','Science','A joyful tour through the origins of the universe and the nature of time.',1988,4.60,2,'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600'),
('The Little Prince','Antoine de Saint-Exupery','Classics','A timeless fable about friendship, wonder, and seeing with the heart.',1943,4.90,5,'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600'),
('Tomorrow, and Tomorrow, and Tomorrow','Gabrielle Zevin','Contemporary','A sweeping story of friendship, games, ambition, and the art of making worlds.',2022,4.40,3,'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600')
) AS v(title,author,genre,description,published_year,rating,available_copies,cover_url)
WHERE NOT EXISTS (SELECT 1 FROM books LIMIT 1);

INSERT INTO books (title, author, genre, description, published_year, rating, available_copies, cover_url)
SELECT title, author, genre, description, published_year, rating, available_copies, cover_url
FROM (VALUES
  ('The Book Thief','Markus Zusak','Historical Fiction','A story of words, courage, and friendship in wartime Germany.',2005,4.70,3,'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600'),
  ('Klara and the Sun','Kazuo Ishiguro','Literary Fiction','An artificial friend observes the world and learns what it means to love.',2021,4.30,3,'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600'),
  ('The Name of the Wind','Patrick Rothfuss','Fantasy','A legendary musician tells the story of his life, loss, and magic.',2007,4.60,3,'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=600'),
  ('The Vanishing Half','Brit Bennett','Historical Fiction','Twin sisters choose radically different lives in a changing America.',2020,4.40,2,'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600'),
  ('Sapiens','Yuval Noah Harari','History','A sweeping account of how humans came to shape the world.',2011,4.50,4,'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600'),
  ('The Psychology of Money','Morgan Housel','Finance','Timeless lessons about wealth, behavior, and making better financial decisions.',2020,4.60,4,'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600'),
  ('Circe','Madeline Miller','Mythology','A powerful retelling about a goddess finding her own strength and voice.',2018,4.70,3,'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600'),
  ('The Seven Husbands of Evelyn Hugo','Taylor Jenkins Reid','Contemporary','A reclusive Hollywood icon finally reveals the truth about her extraordinary life.',2017,4.60,3,'https://images.unsplash.com/photo-1511108690759-009324a90311?w=600')
) AS additions(title, author, genre, description, published_year, rating, available_copies, cover_url)
WHERE NOT EXISTS (
  SELECT 1 FROM books existing WHERE existing.title = additions.title
);

INSERT INTO users (name,email,password_hash)
SELECT 'Demo User','demo@example.com',
'$2a$10$hOR9GJdxe3aZDjAOKRS4uuSiUS.l5C/txpPypbbw/e1DLyVc0CNIa'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='demo@example.com');
