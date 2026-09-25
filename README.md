# BookWise — DSA-Based Book Recommendation System

A full-stack Book Recommendation System designed to satisfy the supplied Final Project requirements.

## Stack
- Frontend: Flutter
- Backend: Node.js + Express
- Database: PostgreSQL
- Authentication: JWT + bcrypt
- API communication: REST/JSON

## DSA used
1. **Queue** — book reservation queue.
2. **Stack** — borrowing/interaction history.
3. **Binary Search Tree (BST)** — in-memory book title search.
4. **Merge Sort** — book/recommendation sorting.
5. **Hash Map** — fast book lookup and recommendation genre counts.

## Main features
- Sign up / Sign in / Sign out
- Dashboard
- Book catalog
- Search
- Sort by title, rating, year
- Book details
- Add/update/delete books
- Favorites
- Personalized recommendations
- Reserve books
- Borrow books
- Borrowing history
- Profile
- PostgreSQL persistence
- Input validation
- JWT-protected API

## Folder structure
```
book_recommendation_system/
├── backend/
│   ├── src/
│   ├── schema.sql
│   ├── seed.sql
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── lib/
    ├── pubspec.yaml
    └── .env.example
```

## 1. PostgreSQL setup
Create a database:
```sql
CREATE DATABASE book_recommendation;
```

Then run:
```bash
psql -U postgres -d book_recommendation -f backend/schema.sql
psql -U postgres -d book_recommendation -f backend/seed.sql
```

## 2. Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```
On macOS/Linux use:
```bash
cp .env.example .env
```

Default API:
`http://localhost:5000/api`

On Windows, edit `backend/.env` if PostgreSQL is not using the default local
connection. The backend must be running before signing in from the Flutter app.
The API health check is available at `http://localhost:5000/api/health`.

## 3. Flutter
Make sure Flutter is installed:
```bash
flutter doctor
```

Then:
```bash
cd frontend
flutter pub get
flutter run
```

Windows desktop support is included:
```powershell
cd frontend
flutter run -d windows
```
If Flutter reports that symlink support is required, enable Windows Developer
Mode once with `start ms-settings:developers`, then retry the command. The
Windows runner files are under `frontend/windows/`.

If Flutter is not installed, install the Flutter SDK and Android Studio (for an
Android emulator), then verify the setup with `flutter doctor`.

For Android emulator, `10.0.2.2` points to your PC. The included API URL uses that address.

For a physical phone, change `API_BASE_URL` in `lib/config.dart` to your computer's LAN IP, for example:
`http://192.168.1.10:5000/api`

The seed catalog includes twenty-two books across fiction, science fiction,
classics, technology, memoir, science, history, finance, mythology, and
art/design.

## Demo account
After running seed.sql:
- Email: `demo@example.com`
- Password: `password123`

## DSA explanation for presentation
- Queue: FIFO reservation processing.
- Stack: LIFO history operations.
- BST: recursively partitions titles for efficient in-memory searching.
- Merge Sort: deterministic O(n log n) sorting.
- Hash Map: average O(1) key lookup and genre frequency counting.

## Final-project compliance

The project directly satisfies the supplied DSA final-project rubric:

- **Functional UI:** Flutter Windows desktop app with public welcome page,
  authentication, dashboard, catalog, reading room, profile, history, and
  community recommendation screens.
- **CRUD:** Books and community recommendations support create, display,
  update, and delete operations. Ownership rules protect user submissions.
- **Search and sorting:** Catalog search covers title, author, and genre.
  Sorting supports title, rating, and publication year.
- **DSA processing:** Reservation queues, history stacks, BST title search,
  merge sorting, and hash-map genre scoring are used in application flows.
- **Validation:** Client feedback and server-side validation cover required
  fields, email format, password length, rating, year, copies, and text limits.
- **Persistence:** PostgreSQL stores users, books, favorites, reservations,
  borrow history, and community recommendations.

See [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) for the full rubric
mapping and [PRESENTATION_OUTLINE.md](PRESENTATION_OUTLINE.md) for the final
demonstration and presentation structure.
