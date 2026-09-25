import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { query } from './db.js';
import { auth, signToken } from './auth.js';
import { ReservationQueue, HistoryStack, BookBST, mergeSort, genreFrequency } from './dsa.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function validateBook(body) {
  const required = ['title', 'author', 'genre'];
  for (const field of required) if (!String(body[field] || '').trim()) return `${field} is required.`;
  const rating = Number(body.rating ?? 0);
  const year = Number(body.published_year ?? 2024);
  const copies = Number(body.available_copies ?? 1);
  if (String(body.title).trim().length > 255 || String(body.author).trim().length > 255)
    return 'Title and author must be 255 characters or fewer.';
  if (String(body.genre).trim().length > 100) return 'Genre must be 100 characters or fewer.';
  if (!Number.isFinite(rating) || !Number.isFinite(copies)) return 'Rating and copies must be numbers.';
  if (rating < 0 || rating > 5) return 'Rating must be between 0 and 5.';
  if (!Number.isInteger(year) || year < 0 || year > 3000) return 'Invalid publication year.';
  if (!Number.isInteger(copies) || copies < 0) return 'Available copies must be a non-negative integer.';
  return null;
}

app.get('/api/health', (_, res) => res.json({ ok: true, service: 'book-recommendation-api' }));

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);
    if (!name?.trim() || !emailPattern.test(normalizedEmail) || !password || password.length < 6)
      return res.status(400).json({ message: 'Name, valid email and password of at least 6 characters are required.' });
    if (name.trim().length > 100) return res.status(400).json({ message: 'Name must be 100 characters or fewer.' });
    const existing = await query('SELECT id FROM users WHERE email=$1', [normalizedEmail]);
    if (existing.rowCount) return res.status(409).json({ message: 'Email is already registered.' });
    const hash = await bcrypt.hash(password, 10);
    const r = await query(
      'INSERT INTO users(name,email,password_hash) VALUES($1,$2,$3) RETURNING id,name,email',
      [name.trim(), normalizedEmail, hash]
    );
    res.status(201).json({ token: signToken(r.rows[0]), user: r.rows[0] });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ message: 'Email is already registered.' });
    res.status(500).json({ message: 'Unable to create account.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const r = await query('SELECT * FROM users WHERE email=$1', [normalizeEmail(email)]);
    if (!r.rowCount || !(await bcrypt.compare(password || '', r.rows[0].password_hash)))
      return res.status(401).json({ message: 'Incorrect email or password.' });
    const user = { id:r.rows[0].id, name:r.rows[0].name, email:r.rows[0].email };
    res.json({ token: signToken(user), user });
  } catch (e) { res.status(500).json({ message: 'Unable to sign in.' }); }
});

app.get('/api/books', auth, async (req, res) => {
  try {
    const q = String(req.query.q || '').trim();
    const sort = String(req.query.sort || 'title');
    const r = await query(
      `SELECT b.*, EXISTS(SELECT 1 FROM favorites f WHERE f.book_id=b.id AND f.user_id=$1) AS is_favorite
       FROM books b
       WHERE ($2='' OR LOWER(b.title) LIKE LOWER('%'||$2||'%') OR LOWER(b.author) LIKE LOWER('%'||$2||'%') OR LOWER(b.genre) LIKE LOWER('%'||$2||'%'))`,
      [req.user.id, q]
    );

    const bst = new BookBST();
    r.rows.forEach(b => bst.insert(b));
    let books = q
      ? [
          ...new Map(
            [
              ...bst.searchPrefix(q),
              ...r.rows.filter(book =>
                [book.author, book.genre].some(value =>
                  String(value).toLowerCase().includes(q.toLowerCase())
                )
              ),
            ].map(book => [book.id, book])
          ).values(),
        ]
      : r.rows;

    if (sort === 'rating') books = mergeSort(books, (a,b) => Number(b.rating)-Number(a.rating));
    else if (sort === 'year') books = mergeSort(books, (a,b) => Number(b.published_year)-Number(a.published_year));
    else books = mergeSort(books, (a,b) => a.title.localeCompare(b.title));

    res.json({
      books,
      algorithm: q
        ? 'BST title-prefix search + author/genre filtering'
        : 'Merge Sort / database retrieval',
    });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.post('/api/books', auth, async (req,res) => {
  try {
    const err = validateBook(req.body);
    if (err) return res.status(400).json({message:err});
    const {title,author,genre,description='',published_year=2024,rating=0,available_copies=1,cover_url='',community_recommendation=false} = req.body;
    const r=await query(`INSERT INTO books(title,author,genre,description,published_year,rating,available_copies,cover_url,submitted_by,is_community_recommendation)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [title.trim(),author.trim(),genre.trim(),description,Number(published_year),Number(rating),Number(available_copies),cover_url,req.user.id,Boolean(community_recommendation)]);
    res.status(201).json(r.rows[0]);
  } catch(e){res.status(500).json({message:e.message});}
});

app.get('/api/my-recommendations', auth, async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM books
       WHERE submitted_by=$1 AND is_community_recommendation=true
       ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json({ books: result.rows });
  } catch (e) {
    res.status(500).json({ message: 'Unable to load your recommendations.' });
  }
});

app.put('/api/books/:id', auth, async (req,res) => {
  try {
    const err=validateBook(req.body); if(err) return res.status(400).json({message:err});
    const {title,author,genre,description='',published_year=2024,rating=0,available_copies=1,cover_url=''}=req.body;
    const r=await query(`UPDATE books SET title=$1,author=$2,genre=$3,description=$4,published_year=$5,rating=$6,available_copies=$7,cover_url=$8
      WHERE id=$9 AND (is_community_recommendation=false OR submitted_by=$10) RETURNING *`,
      [title.trim(),author.trim(),genre.trim(),description,Number(published_year),Number(rating),Number(available_copies),cover_url,req.params.id,req.user.id]);
    if(!r.rowCount) return res.status(404).json({message:'Book not found.'});
    res.json(r.rows[0]);
  } catch(e){res.status(500).json({message:e.message});}
});

app.delete('/api/books/:id', auth, async (req,res) => {
  try {
    const r=await query(
      `DELETE FROM books
       WHERE id=$1 AND (is_community_recommendation=false OR submitted_by=$2)
       RETURNING id`,
      [req.params.id, req.user.id]
    );
    if(!r.rowCount) return res.status(404).json({message:'Book not found.'});
    res.json({message:'Book deleted.'});
  } catch(e){res.status(500).json({message:e.message});}
});

app.get('/api/books/:id', auth, async (req,res)=>{
  const r=await query(`SELECT b.*, EXISTS(SELECT 1 FROM favorites f WHERE f.book_id=b.id AND f.user_id=$1) is_favorite
                       FROM books b WHERE b.id=$2`,[req.user.id,req.params.id]);
  if(!r.rowCount) return res.status(404).json({message:'Book not found.'});
  res.json(r.rows[0]);
});

app.post('/api/books/:id/favorite', auth, async(req,res)=>{
  const existing=await query('SELECT 1 FROM favorites WHERE user_id=$1 AND book_id=$2',[req.user.id,req.params.id]);
  if(existing.rowCount) await query('DELETE FROM favorites WHERE user_id=$1 AND book_id=$2',[req.user.id,req.params.id]);
  else await query('INSERT INTO favorites(user_id,book_id) VALUES($1,$2)',[req.user.id,req.params.id]);
  res.json({favorite:!existing.rowCount});
});

app.post('/api/books/:id/borrow', auth, async(req,res)=>{
  const client = await (await import('./db.js')).pool.connect();
  try {
    await client.query('BEGIN');
    const book=(await client.query('SELECT * FROM books WHERE id=$1 FOR UPDATE',[req.params.id])).rows[0];
    if (!book) {
      await client.query('ROLLBACK');
      return res.status(404).json({message:'Book not found.'});
    }
    if (book.available_copies <= 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({message:'No copies available. Reserve the book instead.'});
    }
    await client.query('UPDATE books SET available_copies=available_copies-1 WHERE id=$1',[req.params.id]);
    await client.query('INSERT INTO borrow_history(user_id,book_id,action) VALUES($1,$2,$3)',[req.user.id,req.params.id,'borrowed']);
    await client.query('COMMIT');
    res.json({message:'Book borrowed successfully.'});
  } catch(e){await client.query('ROLLBACK');res.status(500).json({message:e.message});}
  finally{client.release();}
});

app.post('/api/books/:id/reserve', auth, async(req,res)=>{
  const client = await (await import('./db.js')).pool.connect();
  try {
    await client.query('BEGIN');
    const book = await client.query('SELECT id FROM books WHERE id=$1 FOR UPDATE', [req.params.id]);
    if (!book.rowCount) {
      await client.query('ROLLBACK');
      return res.status(404).json({message:'Book not found.'});
    }
    const duplicate = await client.query(
      `SELECT 1 FROM reservations WHERE user_id=$1 AND book_id=$2 AND status='waiting'`,
      [req.user.id, req.params.id]
    );
    if (duplicate.rowCount) {
      await client.query('ROLLBACK');
      return res.status(409).json({message:'You already have a reservation for this book.'});
    }
    const r = await client.query(
      `SELECT COUNT(*)::int count FROM reservations WHERE book_id=$1 AND status='waiting'`,
      [req.params.id]
    );
    const queue = new ReservationQueue(Array.from({length:r.rows[0].count},(_,i)=>i+1));
    queue.enqueue(req.user.id);
    const position = queue.length;
    await client.query(
      `INSERT INTO reservations(user_id,book_id,status,queue_position) VALUES($1,$2,'waiting',$3)`,
      [req.user.id, req.params.id, position]
    );
    await client.query('COMMIT');
    res.status(201).json({message:'Added to reservation queue.',queue_position:position});
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    res.status(500).json({message:'Unable to reserve this book.'});
  } finally {
    client.release();
  }
});

app.get('/api/history', auth, async(req,res)=>{
  const r=await query(`SELECT h.*,b.title,b.author FROM borrow_history h JOIN books b ON b.id=h.book_id
                       WHERE h.user_id=$1 ORDER BY h.created_at DESC`,[req.user.id]);
  const stack=new HistoryStack(r.rows);
  res.json({history:stack.values(),dataStructure:'Stack (LIFO)'});
});

app.get('/api/recommendations', auth, async(req,res)=>{
  const [booksR, favR, histR] = await Promise.all([
    query('SELECT * FROM books'),
    query('SELECT b.* FROM favorites f JOIN books b ON b.id=f.book_id WHERE f.user_id=$1',[req.user.id]),
    query('SELECT b.* FROM borrow_history h JOIN books b ON b.id=h.book_id WHERE h.user_id=$1',[req.user.id])
  ]);
  const preferences=[...favR.rows,...histR.rows];
  const counts=genreFrequency(preferences);
  const books=booksR.rows.filter(b=>!preferences.some(p=>p.id===b.id)).map(b=>{
    const genreScore=counts.get(b.genre)||0;
    const score=genreScore*10+Number(b.rating)*2;
    return {...b,recommendation_score:score};
  });
  res.json({recommendations:mergeSort(books,(a,b)=>b.recommendation_score-a.recommendation_score).slice(0,15)});
});

app.get('/api/profile', auth, async(req,res)=>{
  const r=await query('SELECT id,name,email,created_at FROM users WHERE id=$1',[req.user.id]);
  res.json(r.rows[0]);
});

app.use((err, _req, res, _next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Request body is too large.' });
  }
  console.error(err);
  return res.status(500).json({ message: 'Internal server error.' });
});

const port = process.env.PORT || 5000;

app.listen(port, '0.0.0.0', () => {
  console.log(`API running on port ${port}`);
});
