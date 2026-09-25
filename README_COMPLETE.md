# BookWise - Intelligent Book Recommendation System

## 🎯 Project Overview

**BookWise** is a full-stack book recommendation system built with Flutter (frontend) and Node.js/Express (backend). The application uses advanced Data Structures and Algorithms (BST, Hash Map, Stack, Queue, Merge Sort) to provide personalized book recommendations to users across mobile, tablet, and desktop platforms.

**Status:** ✅ **COMPLETE & PRODUCTION READY**

---

## 🚀 Quick Start

### Prerequisites
- Flutter 3.x ([Download](https://flutter.dev/docs/get-started/install))
- Node.js 18+ ([Download](https://nodejs.org/))
- Git

### Run Backend

```bash
cd backend
npm install
npm start
```

Backend starts at: `http://localhost:5000/api`

### Run Frontend (Windows Desktop)

```bash
cd frontend
flutter run -d windows
```

Or use the pre-built executable:
```bash
.\build\windows\x64\runner\Debug\book_recommendation_app.exe
```

### Run Frontend (Android Phone - Local Network)

```bash
cd frontend
flutter run -d emulator-5554 \
  --dart-define=API_BASE_URL=http://10.0.2.2:5000/api
```

For physical device:
```bash
flutter run -d <DEVICE_ID> \
  --dart-define=API_BASE_URL=http://<YOUR_LAN_IP>:5000/api
```

### Run Frontend (Web Browser)

```bash
cd frontend
flutter run -d chrome
```

---

## 📚 Documentation

### Complete Project Documentation
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Overview of all features and current status
- **[DSA_FINAL_PROJECT_DOCUMENTATION.md](DSA_FINAL_PROJECT_DOCUMENTATION.md)** - Full project proposal, system design, and flowcharts
- **[DSA_IMPLEMENTATION_DETAILS.md](DSA_IMPLEMENTATION_DETAILS.md)** - Algorithm implementations, database schema, screenshots
- **[PSEUDOCODE_REFERENCE.md](PSEUDOCODE_REFERENCE.md)** - Complete pseudocode for all 5 algorithms
- **[MULTI_DEVICE_SETUP.md](MULTI_DEVICE_SETUP.md)** - Setup guide for running on any device

---

## ✨ Key Features

### Core Functionality
✅ User Registration & Authentication (JWT)  
✅ Book Catalog with Advanced Search  
✅ Personalized Recommendations (AI-powered scoring)  
✅ Book Borrowing & Returns  
✅ Book Reservations with Fair Queue Management  
✅ Reading History Tracking  
✅ User Profiles & Reviews  
✅ 5-Star Rating System  

### Engagement Features
✅ Quote of the Day  
✅ Book Fits for Today (Daily Spotlight)  
✅ Mood-Based Filtering (Feel-good, Adventure, Mystery, Romance)  
✅ Interactive Mood Selector  

### Design & UX
✅ Modern Material Design 3 Theme  
✅ Beautiful Color Scheme (Warm Browns & Golds)  
✅ Responsive Layouts (Mobile, Tablet, Desktop)  
✅ Loading States & Error Handling  
✅ Empty State Messaging  
✅ Touch, Mouse, and Trackpad Support  

### Cross-Platform
✅ Windows Desktop (Fully Tested)  
✅ Android Phones (With LAN IP Config)  
✅ iOS Phones (With LAN IP Config)  
✅ Web Browsers (Chrome, Firefox, etc.)  
✅ Tablets (Responsive Layouts)  

---

## 🏗️ Architecture

### Frontend (Flutter/Dart)
```
lib/
├── main.dart              # App entry point, theme
├── config.dart            # API URL configuration
├── services/
│   └── api.dart          # HTTP client with JWT
└── pages/
    ├── login_page.dart
    ├── welcome_page.dart
    ├── home_page.dart    # Dashboard with quotes & mood
    ├── catalog_page.dart
    ├── recommendations_page.dart
    ├── history_page.dart
    ├── profile_page.dart
    ├── app_drawer.dart
    └── book_form_page.dart
```

### Backend (Node.js/Express)
```
backend/
├── src/
│   ├── server.js         # Express server & routes
│   ├── dsa.js            # All DSA implementations
│   └── database.db       # SQLite database
├── package.json
└── .env                  # Configuration
```

---

## 🔑 Data Structures & Algorithms

### 1. Binary Search Tree (BST) - Book Search
- **Purpose:** Efficiently search books by title/author/genre
- **Time Complexity:** O(log n) average, O(n) worst
- **Location:** `backend/src/dsa.js`

### 2. Hash Map - User Preferences
- **Purpose:** Fast O(1) user preference lookup
- **Time Complexity:** O(1) average
- **Location:** `backend/src/dsa.js`

### 3. Stack - Reading History
- **Purpose:** LIFO history tracking (most recent first)
- **Time Complexity:** O(1) push/pop
- **Location:** `backend/src/dsa.js`

### 4. Queue - Reservations
- **Purpose:** FIFO fair reservation management
- **Time Complexity:** O(1) enqueue/dequeue
- **Location:** `backend/src/dsa.js`

### 5. Merge Sort - Ranking
- **Purpose:** Sort recommendations by relevance
- **Time Complexity:** O(n log n) guaranteed
- **Location:** `backend/src/dsa.js`

---

## 🗄️ Database Schema

### Tables
- **users** - User accounts and profiles
- **books** - Book catalog with availability
- **history** - User activity log
- **reservations** - Book reservation queue
- **reviews** - User reviews and ratings

### Quick Setup
1. Backend initializes SQLite database automatically
2. Run `npm start` to seed sample data
3. Login with test account

---

## 🔐 Security

- ✅ JWT Token Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Token Expiration & Refresh
- ✅ CORS Headers
- ✅ SQL Parameter Binding
- ✅ Input Validation

---

## 📊 Performance

| Operation | Time | Space |
|-----------|------|-------|
| Book Search (BST) | O(log n) | O(n) |
| User Lookup (HashMap) | O(1) | O(n) |
| History Access (Stack) | O(1) | O(n) |
| Process Reservation (Queue) | O(1) | O(n) |
| Rank Recommendations (MergeSort) | O(n log n) | O(n) |

---

## 🧪 Testing & Validation

### Dart Analysis
```bash
cd frontend
flutter analyze
# ✓ No issues found
```

### Unit Tests
```bash
cd frontend
flutter test
# ✓ All tests passed!
```

### Build Verification
```bash
cd frontend
flutter build windows --debug
# ✓ Built build\windows\x64\runner\Debug\book_recommendation_app.exe
```

---

## 📱 Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| Windows | ✅ | Fully tested |
| Android | ✅ | Requires LAN IP config |
| iOS | ✅ | Requires LAN IP config |
| Web | ✅ | Chrome, Firefox compatible |
| macOS | ✅ | Native support |
| Tablets | ✅ | Responsive layout |

**Setup Instructions:** See [MULTI_DEVICE_SETUP.md](MULTI_DEVICE_SETUP.md)

---

## 🐛 Recent Fixes & Improvements

### Critical Fixes
- ✅ **JWT Authentication:** Fixed header to send real token instead of "****"
- ✅ **Input Validation:** Added strict validation for year, rating, copies
- ✅ **Lifecycle Issues:** Fixed setState after dispose warnings
- ✅ **Import Missing:** Added `flutter/gestures.dart` for PointerDeviceKind

### UI Improvements
- ✅ Modern Material Design 3 theme
- ✅ Responsive layouts for all screen sizes
- ✅ Quote of the Day feature
- ✅ Book Fits for Today spotlight
- ✅ Mood-based filtering
- ✅ Enhanced loading and error states

---

## 📝 Usage Examples

### Login
1. Open app
2. Enter email: `user@example.com`
3. Enter password: `password123`
4. Click Login

### Browse Catalog
1. Tap "Catalog" in navigation
2. Use genre chips to filter
3. Tap on a book to view details
4. Click "Borrow" or "Reserve"

### View Recommendations
1. Tap "Recommended" in navigation
2. See personalized picks based on reading history
3. Filter by mood using chips
4. Borrow or reserve books

### Check History
1. Tap "History" in navigation
2. View all past actions
3. See reading statistics
4. Refresh to update

### Update Profile
1. Tap "Profile" in navigation
2. View reading stats
3. Write reviews for books
4. Manage preferences

---

## 🎨 Design Highlights

### Color Scheme
- **Primary:** #C8942E (Warm Gold)
- **Secondary:** #E8D4C4 (Beige)
- **Background:** #FBF7EF (Off-white)
- **Accent:** Complementary browns and golds

### Typography
- **Font Family:** Segoe UI
- **Material 3 Sizing:** Responsive text scaling
- **Accessibility:** High contrast ratios

### Components
- Elevated cards with shadows
- Rounded corners (16dp)
- Material chips for tags
- Responsive buttons
- Loading spinners
- Error messages

---

## 🚢 Deployment

### Production Build (Windows)
```bash
cd frontend
flutter build windows --release
# Output: build/windows/x64/runner/Release/book_recommendation_app.exe
```

### Production Build (Android APK)
```bash
cd frontend
flutter build apk --release \
  --dart-define=API_BASE_URL=https://api.bookwise.com/api
```

### Production Build (iOS)
```bash
cd frontend
flutter build ios --release \
  --dart-define=API_BASE_URL=https://api.bookwise.com/api
```

### Production Build (Web)
```bash
cd frontend
flutter build web --release \
  --dart-define=API_BASE_URL=https://api.bookwise.com/api
```

---

## 🤝 Contributing

### Development Workflow
1. Create a new branch: `git checkout -b feature/my-feature`
2. Make changes and test: `flutter test`
3. Verify analysis: `flutter analyze`
4. Commit: `git commit -am "Add new feature"`
5. Push: `git push origin feature/my-feature`
6. Create Pull Request

### Code Standards
- Follow Dart style guide
- Use meaningful variable names
- Add comments for complex logic
- Test all new features
- Update documentation

---

## 📚 Learning Resources

### Flutter
- [Flutter Official Docs](https://flutter.dev/docs)
- [Dart Language Guide](https://dart.dev/guides)
- [Material Design 3](https://m3.material.io/)

### Backend
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [SQLite Tutorial](https://www.sqlite.org/docs.html)

### Data Structures
- [BST Visualization](https://www.cs.usfca.edu/~galles/visualization/BST.html)
- [Merge Sort Animation](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)
- [Algorithm Complexity](https://www.bigocheatsheet.com/)

---

## 🎓 Project Structure for DSA Course

### Submitted Deliverables
- ✅ Project Proposal (Section 1.1-1.5)
- ✅ System Design (Section 2.1-2.2)
- ✅ Algorithms (Section 3.1-3.2)
- ✅ Pseudocode (Section 3.3)
- ✅ System Implementation (Section 4.1-4.3)
- ✅ Screenshots (Section 4.2)
- ✅ Working Application
- ✅ Full Documentation

---

## 🔗 File Structure

```
book_recommendation_system_fullstack/
│
├── README.md (this file)
├── PROJECT_SUMMARY.md
├── DSA_FINAL_PROJECT_DOCUMENTATION.md
├── DSA_IMPLEMENTATION_DETAILS.md
├── PSEUDOCODE_REFERENCE.md
├── MULTI_DEVICE_SETUP.md
│
├── frontend/                # Flutter application
│   ├── lib/
│   ├── test/
│   ├── build/               # Compiled binaries
│   └── pubspec.yaml
│
└── backend/                 # Node.js API
    ├── src/
    ├── package.json
    └── .env
```

---

## ❓ FAQ

**Q: How do I run the app on my phone?**  
A: See [MULTI_DEVICE_SETUP.md](MULTI_DEVICE_SETUP.md) for detailed instructions. You'll need to configure your LAN IP address.

**Q: What's the default login?**  
A: Email: `user@example.com` | Password: `password123`

**Q: How are recommendations generated?**  
A: Using BST search + Hash Map scoring + Merge Sort ranking based on your reading history and genre preferences.

**Q: Can I use this on production?**  
A: Yes! Switch from SQLite to PostgreSQL and deploy backend to a cloud provider (AWS, Azure, etc.).

**Q: What's the Quote of the Day feature?**  
A: Displays a rotating quote based on the current date. Same quote shown to all users on the same day.

**Q: How does the reservation queue work?**  
A: Books use FIFO Queue - first person to reserve gets it when it's available.

---

## 📞 Support

For issues or questions:
1. Check the documentation files listed above
2. Review the GitHub issues (if on GitHub)
3. Check test files for usage examples
4. Consult backend server logs

---

## 📄 License

This project is created for educational purposes as a DSA course assignment.

---

## 🎉 Summary

BookWise is a **complete, production-ready** book recommendation application that demonstrates:
- ✅ Modern mobile/desktop UI design
- ✅ Full-stack development expertise
- ✅ Data structures and algorithms implementation
- ✅ Cross-platform development
- ✅ Professional code organization
- ✅ Comprehensive documentation
- ✅ Security best practices

**Ready for deployment and use!**

---

**Last Updated:** 2024  
**Status:** ✅ COMPLETE

