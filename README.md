# BookWise — DSA-Based Book Recommendation System

A full-stack Book Recommendation System designed to satisfy the supplied Final Project requirements.

## Stack
- Frontend: Flutter
- Backend: Node.js + Express
- Database: PostgreSQL
- Authentication: JWT + bcrypt
- API communication: REST/JSON

## Languages and why they are used

- **Dart** powers the Flutter frontend. It builds the screens, handles user
  interactions, and calls the backend API. Flutter and Dart let the same
  application run on supported platforms such as Windows, Android, iOS, and
  web.
- **JavaScript** powers the Node.js backend. Express uses it to provide the
  REST API, validate requests, authenticate users, and coordinate database and
  recommendation operations.
- **SQL** defines and queries the PostgreSQL data. It stores and retrieves
  users, books, favorites, reservations, and borrowing history.
- **XML** is not used for application logic; it is a markup/configuration
  format. The Windows runner's
  [application manifest](frontend/windows/runner/runner.exe.manifest) uses XML
  to tell Windows about compatibility and display settings such as per-monitor
  DPI awareness. This helps the desktop app behave correctly on Windows
  displays.

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
├── docs/                      # Setup, project, and algorithm documentation
│   ├── DOCUMENTATION_INDEX.md  # Documentation guide
│   ├── DSA_FINAL_PROJECT_DOCUMENTATION.md
│   ├── DSA_IMPLEMENTATION_DETAILS.md
│   ├── MULTI_DEVICE_SETUP.md
│   ├── PSEUDOCODE_REFERENCE.md
│   └── ...
├── backend/
│   ├── src/
│   │   ├── server.js          # API routes and middleware
│   │   ├── auth.js            # JWT authentication
│   │   ├── db.js              # PostgreSQL connection
│   │   └── dsa.js             # Data structures and algorithms
│   ├── schema.sql
│   ├── seed.sql
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── lib/
    │   ├── pages/             # Application screens
    │   ├── services/          # API client
    │   ├── widgets/           # Shared UI components
    │   ├── config.dart        # API URL configuration
    │   └── main.dart          # App entry point and routes
    ├── pubspec.yaml
    └── test/
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

See [the documentation index](docs/DOCUMENTATION_INDEX.md) for the project
guides, [project documentation](docs/PROJECT_DOCUMENTATION.md) for the full
rubric mapping, and [the presentation outline](docs/PRESENTATION_OUTLINE.md)
for the final demonstration structure.
