# DSA FINAL PROJECT DOCUMENTATION
# BookWise: Intelligent Book Recommendation System

---

## 1. PROJECT PROPOSAL

### 1.1 Project Title
**BookWise** - An Intelligent Book Recommendation System with Data Structure and Algorithm Implementation

### 1.2 Problem Statement

The modern reader faces information overload when selecting books. Existing book discovery systems lack:
- Personalized recommendations based on user reading history
- Efficient book availability tracking in library systems
- Intelligent borrowing request management
- Meaningful engagement through quote inspiration and mood-based discovery
- Cross-platform accessibility for different user devices

### 1.3 Objectives

1. **Build an intelligent recommendation engine** using DSA concepts:
   - BST for efficient book catalog search and filtering
   - Hash Map for O(1) user preference storage and lookup
   - Stack for managing user reading history
   - Queue for handling book reservation requests
   - Merge Sort for sorting recommendations by relevance

2. **Implement a user-friendly mobile and desktop application** that:
   - Works seamlessly on smartphones, tablets, and desktops
   - Provides intuitive book browsing and discovery
   - Enables book borrowing and reservation management
   - Displays personalized recommendations
   - Includes engagement features (Quote of the Day, mood-based filtering)

3. **Ensure scalability and performance**:
   - Efficient database queries with proper indexing
   - Real-time user authentication and authorization
   - Responsive UI that adapts to any screen size

### 1.4 Scope and Limitations

#### Scope
- **In Scope:**
  - User registration, login, and profile management
  - Book catalog browsing and search
  - Recommendation generation based on user history
  - Book borrowing, reservation, and return workflows
  - User review history and statistics
  - Quote of the Day and mood-based discovery
  - Cross-platform deployment (Windows, Android, iOS, Web)
  - JWT-based authentication

- **Out of Scope:**
  - Physical library management system integration
  - Payment processing or library membership tiers
  - Machine learning-based collaborative filtering
  - Native notifications (considered for future iterations)

#### Limitations
- Backend currently uses SQLite (suitable for prototyping; PostgreSQL recommended for production)
- Recommendations are based on genre matching (not collaborative filtering)
- No offline-first syncing (requires internet connection)
- Authentication tokens stored in app memory (not encrypted storage for mobile)

### 1.5 Tools and Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Flutter (Dart) | Cross-platform mobile/desktop UI |
| **Backend** | Node.js + Express.js | REST API server |
| **Database** | SQLite (dev), PostgreSQL (prod) | Data persistence |
| **Authentication** | JWT (JSON Web Tokens) | Secure user sessions |
| **Deployment** | Local network / Cloud | Multi-device accessibility |
| **Build Tools** | Flutter CLI, npm, git | Development and version control |

---

## 2. SYSTEM DESIGN

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE LAYER                      │
│  ┌────────────────┬────────────────┬─────────────────────┐   │
│  │  Flutter App   │   Web Browser  │  Android/iOS Native │   │
│  │  (Windows)     │   (Chrome)     │  (via Flutter)      │   │
│  └────────┬───────┴────────┬───────┴──────────┬──────────┘   │
│           │                │                  │               │
│           └────────────────┼──────────────────┘               │
│                            │                                   │
│                    REST API (HTTP/HTTPS)                      │
│                            │                                   │
│           ┌────────────────┴──────────────────┐               │
└───────────┼──────────────────────────────────┼───────────────┘
            │                                  │
    ┌───────▼──────────────────────────────────▼───────┐
    │        APPLICATION LOGIC LAYER (Backend)         │
    │  ┌──────────────────────────────────────────┐   │
    │  │   Express.js Middleware & Route Handlers │   │
    │  │  - Authentication (JWT verification)     │   │
    │  │  - Request validation & error handling   │   │
    │  │  - CORS & security headers               │   │
    │  └──────────────────────────────────────────┘   │
    │           │                                       │
    │  ┌────────▼─────────────────────────────────┐   │
    │  │   DSA ALGORITHM IMPLEMENTATION           │   │
    │  │  - BST: Catalog search & filtering       │   │
    │  │  - Hash Map: User preferences lookup     │   │
    │  │  - Stack: Reading history management     │   │
    │  │  - Queue: Reservation request handling   │   │
    │  │  - Merge Sort: Recommendations sorting   │   │
    │  └────────┬─────────────────────────────────┘   │
    │           │                                       │
    └───────────┼───────────────────────────────────────┘
                │
    ┌───────────▼───────────────────┐
    │  DATA PERSISTENCE LAYER       │
    │  ┌─────────────────────────┐  │
    │  │  SQLite Database        │  │
    │  │  - Users table          │  │
    │  │  - Books table          │  │
    │  │  - Recommendations tbl  │  │
    │  │  - History table        │  │
    │  │  - Reservations table   │  │
    │  │  - Reviews table        │  │
    │  └─────────────────────────┘  │
    └───────────────────────────────┘
```

### 2.2 System Flowchart

#### User Registration & Login Flow

```
┌─────────────┐
│   START     │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ User Opens App      │
└──────┬──────────────┘
       │
       ▼
┌──────────────────────────┐
│ Authenticated?           │
└──┬───────────┬───────────┘
   │ NO        │ YES
   ▼           ▼
┌──────────┐  ┌──────────────────┐
│LOGIN     │  │ HOME PAGE        │
│PAGE      │  │ (Dashboard)      │
└────┬─────┘  └──────────────────┘
     │                │
     ▼                ▼
┌──────────────────┐  (Browse recommendations,
│ Enter Email &    │   view catalog, etc.)
│ Password         │
└────┬─────────────┘
     │
     ▼
┌────────────────────┐
│ Verify Credentials │ ← Hash check in DB
│ (Hash compare)     │
└────┬───────┬───────┘
     │YES    │NO
     ▼       ▼
┌─────────┐ ┌──────────────┐
│ JWT     │ │ Show Error   │
│ Token   │ │ Retry Login  │
│ Created │ │ or Sign Up   │
└─────────┘ └──────────────┘
     │
     ▼
┌───────────────────┐
│ Store Token in    │
│ App Memory        │
└────────┬──────────┘
         │
         ▼
    [Go to Home]
```

#### Recommendation Generation Flow

```
┌──────────────────┐
│ User Views Home  │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────┐
│ Fetch User's Reading History│
│ (Using STACK data structure)│
└────────┬────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Extract Genres from History  │
│ (User preferences in HashMap)│
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Search Catalog using BST     │
│ Find books matching genres   │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Score & Rank Recommendations │
│ (Merge Sort by relevance)    │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Display Top 10 Recommendations
│ with "Book Fits for Today"   │
└──────────────────────────────┘
```

#### Book Borrowing & Reservation Flow

```
┌──────────────────┐
│ User Selects Book│
└────────┬─────────┘
         │
         ▼
┌────────────────────┐
│ Check Availability │
└────────┬───┬───────┘
    YES  │   │ NO
        ▼   ▼
   ┌──────┐ ┌──────────────────┐
   │BORROW│ │ Add to Reservation
   │      │ │ (QUEUE structure)│
   └──┬───┘ └────────┬─────────┘
      │               │
      ▼               ▼
  ┌─────────┐    ┌────────────────┐
  │ Update  │    │ Notify User:   │
  │ User's  │    │ Position in Q  │
  │ Books   │    └────────────────┘
  │ Held    │
  └─────────┘
```

---

## 3. DATA STRUCTURES AND ALGORITHMS

### 3.1 Algorithms Overview

#### 3.1.1 Binary Search Tree (BST) - Book Catalog Search
**Purpose:** Efficiently search and filter books by title, author, or genre.  
**Time Complexity:** O(log n) average, O(n) worst case  
**Space Complexity:** O(n)

**Use Case:**
- Fast book lookup by title
- Range queries (books published between year X and Y)
- Alphabetical sorting of catalog

**Implementation Location:** `backend/src/dsa.js` - `findBooksByTitle()` and `findBooksByGenre()`

#### 3.1.2 Hash Map - User Preferences & Recommendations
**Purpose:** Store and retrieve user reading preferences in O(1) time.  
**Time Complexity:** O(1) average lookup, O(n) insertion  
**Space Complexity:** O(n)

**Use Case:**
- Map user IDs to their preferred genres
- Fast recommendation score caching
- Author preference tracking

**Implementation Location:** `backend/src/dsa.js` - `userPreferences` map

#### 3.1.3 Stack - User Reading History
**Purpose:** Maintain LIFO (Last In First Out) structure for recent reading activity.  
**Time Complexity:** O(1) push/pop  
**Space Complexity:** O(n)

**Use Case:**
- Display "Recently Read" books
- Undo recent actions
- Track reading progression

**Implementation Location:** `backend/src/dsa.js` - `getUserHistory()` returns a stack-ordered list

#### 3.1.4 Queue - Book Reservations
**Purpose:** Manage FIFO (First In First Out) reservation requests.  
**Time Complexity:** O(1) enqueue/dequeue  
**Space Complexity:** O(n)

**Use Case:**
- Fair queue for book reservations
- Track waiting users in order
- Process reservations sequentially

**Implementation Location:** `backend/src/dsa.js` - `reserveBook()` enqueues requests, `processReservation()` dequeues

#### 3.1.5 Merge Sort - Recommendation Ranking
**Purpose:** Sort recommendations by relevance score.  
**Time Complexity:** O(n log n) guaranteed  
**Space Complexity:** O(n)

**Use Case:**
- Sort recommendations by match score
- Sort search results by relevance
- Top-K recommendations extraction

**Implementation Location:** `backend/src/dsa.js` - `getRecommendations()` uses merge sort on scores

---

### 3.2 Pseudocode

#### Algorithm 1: BST Search for Books by Genre

```
ALGORITHM SearchByGenre(root, targetGenre)
INPUT: root = BST node pointing to catalog root, targetGenre = string
OUTPUT: List of matching books

   IF root == NULL THEN
      RETURN empty list
   END IF
   
   results ← empty list
   
   // In-order traversal with genre matching
   TRAVERSE in-order(root):
      IF current_book.genre == targetGenre THEN
         results.add(current_book)
      END IF
      
      IF current_book.genre < targetGenre THEN
         TRAVERSE right subtree
      ELSE
         TRAVERSE left subtree
      END IF
   END TRAVERSE
   
   RETURN results

TIME COMPLEXITY: O(n) worst case, O(log n) average if balanced
SPACE COMPLEXITY: O(h) for recursion stack, where h = height
```

#### Algorithm 2: Hash Map Recommendation Scoring

```
ALGORITHM GenerateRecommendations(userId, topK)
INPUT: userId = user ID, topK = number of recommendations
OUTPUT: List of top K recommended books

   // Fetch user's reading history (Stack)
   userHistory ← getUserHistory(userId)  // O(1) in HashMap
   
   // Extract user's preferred genres
   preferenceMap ← HashMap()
   FOR EACH book IN userHistory DO
      FOR EACH genre IN book.genres DO
         IF preferenceMap.contains(genre) THEN
            preferenceMap[genre] ← preferenceMap[genre] + 1
         ELSE
            preferenceMap[genre] ← 1
         END IF
      END FOR
   END FOR
   
   // Score all books in catalog
   scores ← empty array
   FOR EACH book IN catalog DO
      score ← 0
      FOR EACH genre IN book.genres DO
         IF preferenceMap.contains(genre) THEN
            score ← score + preferenceMap[genre]
         END IF
      END FOR
      
      // Adjust for book's popularity and rating
      score ← score + (book.rating * 0.5) + (book.borrowCount * 0.1)
      
      scores.add({book, score})
   END FOR
   
   // Sort scores using Merge Sort (O(n log n))
   sortedScores ← MergeSort(scores, by score descending)
   
   // Return top K
   recommendations ← []
   FOR i = 0 TO min(topK, sortedScores.length) DO
      recommendations.add(sortedScores[i].book)
   END FOR
   
   RETURN recommendations

TIME COMPLEXITY: O(n log n) due to Merge Sort
SPACE COMPLEXITY: O(n) for scores array
```

#### Algorithm 3: Queue-based Book Reservation

```
ALGORITHM ReserveBook(bookId, userId)
INPUT: bookId = ID of book to reserve, userId = ID of reserving user
OUTPUT: Reservation status and queue position

   book ← FindBook(bookId)  // BST search: O(log n)
   
   IF book.availableCopies > 0 THEN
      // Book is available, borrow immediately
      book.availableCopies ← book.availableCopies - 1
      userBooks[userId].add(book)
      RETURN {status: "BORROWED", copies_remaining: book.availableCopies}
   ELSE
      // Book is not available, add to reservation queue
      reservation ← {userId, bookId, timestamp: NOW}
      reservationQueue[bookId].enqueue(reservation)  // O(1)
      
      position ← reservationQueue[bookId].length()
      RETURN {status: "RESERVED", queue_position: position}
   END IF

TIME COMPLEXITY: O(log n) for book search + O(1) for queue operation
SPACE COMPLEXITY: O(1) for new reservation
```

#### Algorithm 4: Stack-based Reading History

```
ALGORITHM AddToHistory(userId, bookId, action)
INPUT: userId = user ID, bookId = book ID, action = "READ"/"RATED"/"REVIEWED"
OUTPUT: Updated history (implicitly on backend)

   // User's reading history is stored as a Stack (LIFO)
   historyStack ← userHistory[userId]  // O(1) HashMap lookup
   
   IF historyStack == NULL THEN
      historyStack ← new Stack()
      userHistory[userId] ← historyStack
   END IF
   
   historyEntry ← {
      bookId: bookId,
      action: action,
      timestamp: NOW,
      rating: IF action == "RATED" THEN book.rating ELSE NULL
   }
   
   historyStack.push(historyEntry)  // O(1)
   
   RETURN SUCCESS

TIME COMPLEXITY: O(1)
SPACE COMPLEXITY: O(1)

ALGORITHM GetRecentHistory(userId, limit)
INPUT: userId = user ID, limit = number of recent entries
OUTPUT: List of recent history entries

   historyStack ← userHistory[userId]
   recentEntries ← []
   
   // Peek from top of stack (most recent)
   FOR i = 0 TO min(limit, historyStack.size()) DO
      recentEntries.add(historyStack[historyStack.size() - 1 - i])
   END FOR
   
   RETURN recentEntries  // Returns in LIFO order

TIME COMPLEXITY: O(limit)
SPACE COMPLEXITY: O(limit)
```

#### Algorithm 5: Merge Sort for Recommendations

```
ALGORITHM MergeSort(array, comparator)
INPUT: array = list of items to sort, comparator = sorting criteria
OUTPUT: Sorted array in ascending/descending order

   IF array.length <= 1 THEN
      RETURN array
   END IF
   
   mid ← array.length / 2
   leftArray ← array[0...mid-1]
   rightArray ← array[mid...length-1]
   
   leftSorted ← MergeSort(leftArray, comparator)
   rightSorted ← MergeSort(rightArray, comparator)
   
   RETURN Merge(leftSorted, rightSorted, comparator)

ALGORITHM Merge(left, right, comparator)
INPUT: left = sorted left half, right = sorted right half
OUTPUT: Merged sorted array

   result ← empty array
   i ← 0, j ← 0
   
   WHILE i < left.length AND j < right.length DO
      IF comparator(left[i], right[j]) THEN
         result.add(left[i])
         i ← i + 1
      ELSE
         result.add(right[j])
         j ← j + 1
      END IF
   END WHILE
   
   // Add remaining elements
   WHILE i < left.length DO
      result.add(left[i])
      i ← i + 1
   END WHILE
   
   WHILE j < right.length DO
      result.add(right[j])
      j ← j + 1
   END WHILE
   
   RETURN result

TIME COMPLEXITY: O(n log n) guaranteed
SPACE COMPLEXITY: O(n) for merge operations
```

---

### 3.3 Complexity Analysis Summary

| Data Structure/Algorithm | Operation | Time | Space | Use Case |
|--------------------------|-----------|------|-------|----------|
| **BST** | Search | O(log n)* | O(n) | Catalog filtering |
| **Hash Map** | Insert/Lookup | O(1)* | O(n) | User preferences |
| **Stack** | Push/Pop | O(1) | O(n) | Reading history |
| **Queue** | Enqueue/Dequeue | O(1) | O(n) | Reservations |
| **Merge Sort** | Sort | O(n log n) | O(n) | Ranking results |

*Average case; worst case O(n) if unbalanced


