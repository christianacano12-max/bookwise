# BookWise Final Project Documentation

## 1. Group and project information

**Project title:** BookWise — DSA-Based Book Recommendation System  
**System topic:** A digital library and personalized book discovery system  
**Platform:** Flutter Windows desktop application  
**Backend:** Node.js, Express, JWT, bcrypt  
**Database:** PostgreSQL

Complete the following before submission:

| Member | Responsibility | Contribution |
|---|---|---|
| Member 1 | Project lead / integration | Replace with member name and work |
| Member 2 | Frontend and UI | Replace with member name and work |
| Member 3 | Backend and database | Replace with member name and work |
| Member 4 | DSA, testing, and presentation | Replace with member name and work |

The group should keep evidence of each member's contribution in the source
history, documentation, testing, and presentation preparation.

## 2. Problem and solution

Readers often have difficulty finding their next book and tracking the books
they borrow. BookWise provides a searchable persistent catalog, favorites,
borrowing, reservations, history, personalized recommendations, and a
community recommendation workflow.

## 3. Data structures

| Data structure | Where it is implemented | Why it was selected |
|---|---|---|
| Queue | `ReservationQueue` in `backend/src/dsa.js`; reservation endpoint | Reservations must be processed in first-in-first-out order. |
| Stack | `HistoryStack` in `backend/src/dsa.js`; history endpoint | A stack naturally represents the most recent borrowing activity first. |
| Binary Search Tree | `BookBST` in `backend/src/dsa.js`; catalog title search | A BST provides an in-memory ordered structure for title-prefix lookup. |
| Hash Map | `genreFrequency` in `backend/src/dsa.js`; recommendation scoring | A map counts preferred genres with average O(1) key access. |
| PostgreSQL relational tables | `backend/schema.sql` | Persistent storage maintains users, books, favorites, reservations, history, and ownership. |

The project exceeds the minimum of four data structures.

## 4. Algorithms

| Algorithm | Where it is used | Complexity / purpose |
|---|---|---|
| BST traversal and prefix search | Catalog title search | Traverses the title tree to find title prefixes. |
| Merge Sort | Catalog sorting and recommendation ranking | O(n log n) deterministic sorting by title, rating, year, or score. |
| FIFO queue processing | Reservation positions | Assigns the next queue position in insertion order. |
| LIFO stack reversal | Borrowing history | Presents the newest activity first. |
| Genre-frequency scoring | Recommendation generation | Scores books using genre matches and ratings. |
| Parameterized SQL queries | All database operations | Prevents SQL injection and keeps persistence consistent. |

The project exceeds the minimum of four algorithms.

## 5. System requirements mapping

### Functional user interface

The Flutter app includes:

- Public welcome/introduction page
- Sign in and sign up
- Dashboard
- Book catalog
- Search and sort controls
- Reading room recommendations
- Community recommendation form
- Profile
- Borrowing history
- Navigation drawer and sign out

### CRUD and display

- **Create:** Add books and submit community recommendations.
- **Read:** Display catalog, recommendations, profile, and history.
- **Update:** Edit books and owned community recommendations.
- **Delete:** Delete books and owned community recommendations with confirmation.

### Search and sorting

Catalog search supports title, author, and genre. Title-prefix matches use
the BST, while author and genre matches are merged into the result set.
Sorting supports title, rating, and publication year using Merge Sort.

### Validation

The backend validates:

- Required title, author, and genre
- Email format
- Minimum password length
- Maximum name/title/author/genre lengths
- Rating from 0 to 5
- Valid publication year
- Non-negative integer copy count
- Duplicate email and duplicate waiting reservation protection

### Persistent storage

PostgreSQL persists all data required by the system. Foreign keys, indexes,
unique constraints, and transactional borrowing/reservation operations protect
data integrity.

## 6. Pseudocode

### 6.1 Add a book

```text
PROCEDURE addBook(user, bookData)
    IF user is not authenticated
        RETURN "Authentication required"
    END IF

    IF title, author, or genre is empty
        RETURN "Required field error"
    END IF

    IF rating is not between 0 and 5
        RETURN "Rating error"
    END IF

    IF year is invalid OR copies is negative
        RETURN "Book value error"
    END IF

    INSERT bookData INTO PostgreSQL
    RETURN created book
END PROCEDURE
```

### 6.2 BST title search with author/genre matching

```text
PROCEDURE searchBooks(query)
    books <- load books from database
    tree <- empty Binary Search Tree

    FOR each book IN books
        tree.insert(book by title)
    END FOR

    titleMatches <- tree.searchTitlePrefix(query)
    authorGenreMatches <- empty list

    FOR each book IN books
        IF query appears in book.author OR book.genre
            add book to authorGenreMatches
        END IF
    END FOR

    results <- titleMatches + authorGenreMatches
    remove duplicate book IDs from results
    RETURN results
END PROCEDURE
```

### 6.3 Merge Sort

```text
FUNCTION mergeSort(items, compare)
    IF length(items) <= 1
        RETURN items
    END IF

    middle <- length(items) / 2
    left <- mergeSort(first half of items, compare)
    right <- mergeSort(second half of items, compare)

    RETURN merge(left, right, compare)
END FUNCTION
```

### 6.4 Reservation Queue

```text
PROCEDURE reserveBook(userID, bookID)
    IF user already has a waiting reservation
        RETURN "Duplicate reservation"
    END IF

    waitingCount <- count waiting reservations for bookID
    queue <- Queue containing positions 1 through waitingCount
    queue.enqueue(userID)
    position <- queue.length

    save reservation(userID, bookID, position)
    RETURN position
END PROCEDURE
```

### 6.5 Borrowing History Stack

```text
PROCEDURE getHistory(userID)
    records <- load user's borrowing records ordered by date
    historyStack <- empty Stack

    FOR each record IN records
        historyStack.push(record)
    END FOR

    RETURN historyStack.values in reverse insertion order
END PROCEDURE
```

### 6.6 Recommendation scoring with a Hash Map

```text
PROCEDURE recommendBooks(userID)
    preferences <- user's favorites + borrowing history
    genreCounts <- empty Hash Map

    FOR each book IN preferences
        genreCounts[book.genre] <- genreCounts[book.genre] + 1
    END FOR

    candidates <- all books not already in preferences

    FOR each book IN candidates
        genreScore <- genreCounts[book.genre] OR 0
        book.score <- (genreScore * 10) + (book.rating * 2)
    END FOR

    sorted <- mergeSort(candidates by descending score)
    RETURN first 15 books from sorted
END PROCEDURE
```

### 6.7 Update and delete ownership rule

```text
PROCEDURE updateOrDelete(userID, bookID)
    book <- find book by bookID

    IF book does not exist
        RETURN "Book not found"
    END IF

    IF book is a community recommendation AND book.submittedBy != userID
        RETURN "Not allowed"
    END IF

    update or delete book
    RETURN success
END PROCEDURE
```

## 7. Demonstration script

1. Open the public BookWise welcome page.
2. Explain the problem and three key features.
3. Sign in using the demo account.
4. Search the catalog by title, author, and genre.
5. Sort by rating or publication year.
6. Favorite and borrow a book.
7. Reserve a book with no available copies.
8. Show borrowing history and identify the Stack behavior.
9. Open recommendations and explain Hash Map genre scoring and Merge Sort.
10. Submit a community book recommendation.
11. Edit the submitted recommendation.
12. Delete it with confirmation.
13. Explain Queue, Stack, BST, Hash Map, and Merge Sort in the code.

## 8. Submission checklist

- [ ] Four group members and responsibilities filled in
- [ ] Working Windows application demonstrated
- [ ] Source code submitted
- [ ] This documentation completed with member contributions
- [ ] Presentation delivered using `PRESENTATION_OUTLINE.md`
- [ ] Final demonstration follows the script above
- [ ] Demo account and database setup tested
