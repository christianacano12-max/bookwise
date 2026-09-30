# BookWise Presentation Outline

## Slide 1 — Title

**BookWise: DSA-Based Book Recommendation System**

Include the four group members, course, section, and date.

## Slide 2 — Problem

- Readers struggle to discover relevant books.
- Library actions are difficult to track manually.
- Reservations need fair first-in-first-out processing.

## Slide 3 — Proposed solution

- Searchable persistent catalog
- Personalized recommendations
- Favorites, borrowing, reservations, and history
- Community-submitted recommendations

## Slide 4 — Technology stack

- Flutter Windows desktop frontend
- Node.js and Express REST backend
- PostgreSQL database
- JWT and bcrypt authentication

## Slide 5 — Data structures

Explain these five structures:

1. **Queue:** reservation order, FIFO.
2. **Stack:** recent borrowing history, LIFO.
3. **Binary Search Tree:** title-prefix search.
4. **Hash Map:** genre-frequency recommendation scoring.
5. **Relational tables:** persistent linked system data.

## Slide 6 — Algorithms

Explain:

- BST traversal for title-prefix search
- Merge Sort for catalog sorting
- Merge Sort for recommendation ranking
- Queue enqueue and position calculation
- Stack reversal for newest history first
- Hash-map frequency counting for personalization

## Slide 7 — Pseudocode

Show simplified pseudocode for:

```text
searchBooks(query):
    insert books into BST
    titleMatches <- BST prefix search
    authorGenreMatches <- field filtering
    return unique combined results

recommendBooks(user):
    count preferred genres in Hash Map
    score remaining books
    Merge Sort by descending score
    return top 15
```

Also explain that validation happens before INSERT and ownership is checked
before UPDATE or DELETE.

## Slide 8 — CRUD demonstration

Show:

1. Create a community recommendation.
2. Display it in “Your community picks.”
3. Edit its details.
4. Delete it with confirmation.

Also show catalog create, edit, and delete behavior.

## Slide 9 — Search, sorting, and validation

Demonstrate:

- Search by title
- Search by author
- Search by genre
- Sort by title, rating, and year
- Invalid rating/year/copy validation

## Slide 10 — Database and security

- PostgreSQL foreign keys and indexes
- Parameterized SQL queries
- JWT-protected routes
- bcrypt password hashing
- Ownership checks for community CRUD
- Transactional borrowing and reservations

## Slide 11 — Live final demonstration

Follow the demonstration script in `PROJECT_DOCUMENTATION.md`.

## Slide 12 — Results

- Functional desktop application
- More than four data structures
- More than four algorithms
- Full CRUD workflow
- Persistent database
- Validated search, sorting, and recommendations

## Slide 13 — Conclusion

BookWise combines practical library features with visible, explainable DSA
processing and provides a complete working system for the final project.
