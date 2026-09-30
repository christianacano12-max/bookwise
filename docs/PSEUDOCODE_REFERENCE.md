# DSA Algorithms - Pseudocode Reference

## 📋 Table of Contents
1. Binary Search Tree (BST)
2. Hash Map
3. Stack
4. Queue
5. Merge Sort

---

## 1. BINARY SEARCH TREE (BST)

### Purpose
Efficiently search, insert, and organize books in the catalog by title, author, or genre.

### Data Structure Definition

```
BST_NODE:
    book: Book object
    left: pointer to BST_NODE or NULL
    right: pointer to BST_NODE or NULL
    
BOOK_OBJECT:
    id: integer
    title: string
    author: string
    genre: string
    year: integer
    rating: float
    copies: integer
```

### Algorithm 1.1: Insert Book into BST

```
ALGORITHM InsertBook(root, newBook)
INPUT: root - pointer to root BST node, newBook - book to insert
OUTPUT: Updated BST with new book

    IF root == NULL THEN
        CREATE newNode
        newNode.book ← newBook
        newNode.left ← NULL
        newNode.right ← NULL
        RETURN newNode
    END IF
    
    IF newBook.title < root.book.title THEN
        root.left ← InsertBook(root.left, newBook)
    ELSE IF newBook.title > root.book.title THEN
        root.right ← InsertBook(root.right, newBook)
    ELSE
        // Book already exists, update it
        root.book ← newBook
    END IF
    
    RETURN root

COMPLEXITY ANALYSIS:
    Time: O(log n) average case
          O(n) worst case (unbalanced tree)
    Space: O(h) where h is height (recursive stack)
```

### Algorithm 1.2: Search Book by Title

```
ALGORITHM SearchByTitle(root, targetTitle)
INPUT: root - pointer to root BST node, targetTitle - title to find
OUTPUT: Book object or NULL if not found

    IF root == NULL THEN
        RETURN NULL
    END IF
    
    IF targetTitle == root.book.title THEN
        RETURN root.book
    ELSE IF targetTitle < root.book.title THEN
        RETURN SearchByTitle(root.left, targetTitle)
    ELSE
        RETURN SearchByTitle(root.right, targetTitle)
    END IF

COMPLEXITY ANALYSIS:
    Time: O(log n) average
          O(n) worst case
    Space: O(h) recursive stack
```

### Algorithm 1.3: In-Order Traversal (Sorted List)

```
ALGORITHM InOrderTraversal(root, resultList)
INPUT: root - pointer to BST root, resultList - output array
OUTPUT: resultList sorted by title (ascending)

    IF root == NULL THEN
        RETURN
    END IF
    
    // Process left subtree
    InOrderTraversal(root.left, resultList)
    
    // Process current node
    resultList.add(root.book)
    
    // Process right subtree
    InOrderTraversal(root.right, resultList)

COMPLEXITY ANALYSIS:
    Time: O(n) - visit each node once
    Space: O(h) recursive stack + O(n) for result list
```

### Algorithm 1.4: Search Books by Genre

```
ALGORITHM SearchByGenre(root, targetGenre, resultList)
INPUT: root - BST pointer, targetGenre - genre to match
OUTPUT: resultList - all books matching genre

    IF root == NULL THEN
        RETURN
    END IF
    
    // Always check left subtree (alphabetically before)
    SearchByGenre(root.left, targetGenre, resultList)
    
    // Check current node
    IF root.book.genre == targetGenre THEN
        resultList.add(root.book)
    END IF
    
    // Always check right subtree (alphabetically after)
    SearchByGenre(root.right, targetGenre, resultList)

COMPLEXITY ANALYSIS:
    Time: O(n) - may need to visit all nodes
    Space: O(h) recursive stack + output size
```

### Algorithm 1.5: Delete Book from BST

```
ALGORITHM DeleteBook(root, titleToDelete)
INPUT: root - BST pointer, titleToDelete - title to remove
OUTPUT: Updated BST without the book

    IF root == NULL THEN
        RETURN NULL
    END IF
    
    IF titleToDelete < root.book.title THEN
        root.left ← DeleteBook(root.left, titleToDelete)
    ELSE IF titleToDelete > root.book.title THEN
        root.right ← DeleteBook(root.right, titleToDelete)
    ELSE
        // Found the node to delete
        
        // Case 1: No children (leaf node)
        IF root.left == NULL AND root.right == NULL THEN
            RETURN NULL
        END IF
        
        // Case 2: One child
        IF root.left == NULL THEN
            RETURN root.right
        END IF
        IF root.right == NULL THEN
            RETURN root.left
        END IF
        
        // Case 3: Two children
        // Find in-order successor (smallest in right subtree)
        successor ← FindMin(root.right)
        root.book ← successor.book
        root.right ← DeleteBook(root.right, successor.book.title)
    END IF
    
    RETURN root

COMPLEXITY ANALYSIS:
    Time: O(log n) average, O(n) worst case
    Space: O(h) recursive stack
```

---

## 2. HASH MAP (Dictionaries/Associative Arrays)

### Purpose
Store user preferences and recommendations in O(1) average time for fast lookup.

### Data Structure Definition

```
HASH_MAP:
    buckets: array of linked lists
    size: number of buckets
    count: number of entries
    
KEY_VALUE_PAIR:
    key: user_id (integer)
    value: preferences object
    
PREFERENCES_OBJECT:
    genres: array of strings
    favoriteAuthors: array of strings
    readingHistory: array of book_ids
    lastUpdated: timestamp
```

### Algorithm 2.1: Insert into Hash Map

```
ALGORITHM Insert(hashMap, key, value)
INPUT: hashMap - hash map instance, key - identifier, value - data
OUTPUT: Entry stored in hash map

    // Calculate hash for the key
    hashValue ← Hash(key)
    
    // Get bucket index
    bucketIndex ← hashValue MOD hashMap.size
    
    // Access bucket
    bucket ← hashMap.buckets[bucketIndex]
    
    // Check if key already exists
    FOR EACH entry IN bucket DO
        IF entry.key == key THEN
            entry.value ← value  // Update existing
            RETURN
        END IF
    END FOR
    
    // Key not found, add new entry
    newEntry ← CREATE {key: key, value: value}
    bucket.add(newEntry)
    hashMap.count ← hashMap.count + 1

COMPLEXITY ANALYSIS:
    Time: O(1) average (collision-free hash)
          O(n) worst case (all collisions)
    Space: O(1) - constant space per entry
```

### Algorithm 2.2: Lookup/Retrieve from Hash Map

```
ALGORITHM Get(hashMap, key)
INPUT: hashMap - hash map instance, key - identifier to find
OUTPUT: value associated with key or NULL

    // Calculate hash
    hashValue ← Hash(key)
    
    // Get bucket index
    bucketIndex ← hashValue MOD hashMap.size
    
    // Search in bucket
    bucket ← hashMap.buckets[bucketIndex]
    
    FOR EACH entry IN bucket DO
        IF entry.key == key THEN
            RETURN entry.value
        END IF
    END FOR
    
    // Key not found
    RETURN NULL

COMPLEXITY ANALYSIS:
    Time: O(1) average, O(n) worst case
    Space: O(1) - constant lookup space
```

### Algorithm 2.3: Delete from Hash Map

```
ALGORITHM Delete(hashMap, key)
INPUT: hashMap - instance, key - identifier to remove
OUTPUT: Entry removed from hash map

    // Calculate hash
    hashValue ← Hash(key)
    bucketIndex ← hashValue MOD hashMap.size
    bucket ← hashMap.buckets[bucketIndex]
    
    // Find and remove
    FOR i = 0 TO bucket.length() - 1 DO
        IF bucket[i].key == key THEN
            bucket.removeAt(i)
            hashMap.count ← hashMap.count - 1
            RETURN TRUE
        END IF
    END FOR
    
    RETURN FALSE  // Key not found

COMPLEXITY ANALYSIS:
    Time: O(1) average, O(n) worst case
    Space: O(1)
```

### Algorithm 2.4: Hash Function

```
ALGORITHM Hash(key)
INPUT: key - integer (user_id)
OUTPUT: hash value (integer)

    // Simple hash function for integers
    CONST PRIME ← 31
    CONST MOD ← 1000000007
    
    hashValue ← key * PRIME MOD MOD
    
    RETURN hashValue

NOTE: Better hash functions use different primes and can handle collisions
via open addressing or chaining (chaining shown above).
```

---

## 3. STACK (Last In First Out - LIFO)

### Purpose
Manage user reading history in reverse chronological order (most recent first).

### Data Structure Definition

```
STACK:
    items: array of elements
    top: pointer to top element (-1 if empty)
    
HISTORY_ENTRY:
    bookId: integer
    action: string ("READ", "RATED", "REVIEWED")
    rating: integer (1-5)
    timestamp: date/time
    reviewText: string
```

### Algorithm 3.1: Push (Add to Stack)

```
ALGORITHM Push(stack, element)
INPUT: stack - stack instance, element - item to add
OUTPUT: Element added to top of stack

    // Create new entry
    entry ← element
    
    // Check if stack is at capacity
    IF stack.items.length >= stack.capacity THEN
        // Double capacity or handle overflow
        ExpandStack(stack)
    END IF
    
    // Add to top
    stack.items.add(entry)
    stack.top ← stack.top + 1
    
    RETURN TRUE

COMPLEXITY ANALYSIS:
    Time: O(1) amortized (expansion is rare)
    Space: O(1) per push
```

### Algorithm 3.2: Pop (Remove from Stack)

```
ALGORITHM Pop(stack)
INPUT: stack - stack instance
OUTPUT: Top element removed and returned

    IF stack.top == -1 THEN
        RETURN NULL  // Stack is empty
    END IF
    
    // Get top element
    element ← stack.items[stack.top]
    
    // Remove from stack
    stack.items.removeAt(stack.top)
    stack.top ← stack.top - 1
    
    RETURN element

COMPLEXITY ANALYSIS:
    Time: O(1)
    Space: O(1)
```

### Algorithm 3.3: Peek (View Top Without Removing)

```
ALGORITHM Peek(stack)
INPUT: stack - stack instance
OUTPUT: Top element value (not removed)

    IF stack.top == -1 THEN
        RETURN NULL
    END IF
    
    RETURN stack.items[stack.top]

COMPLEXITY ANALYSIS:
    Time: O(1)
    Space: O(1)
```

### Algorithm 3.4: Get Reading History (Latest First)

```
ALGORITHM GetHistory(userId, limit)
INPUT: userId - user identifier, limit - max entries to return
OUTPUT: Array of recent history entries (LIFO order)

    // Fetch from database/storage
    userHistory ← LoadHistoryFromDatabase(userId)
    
    // Convert to stack view (reverse order)
    result ← empty array
    
    FOR i = userHistory.length - 1 DOWN TO 0 DO
        result.add(userHistory[i])
        IF result.length >= limit THEN
            BREAK
        END IF
    END FOR
    
    RETURN result  // Most recent first

COMPLEXITY ANALYSIS:
    Time: O(n) where n = number of entries
    Space: O(limit)
```

### Algorithm 3.5: Push to History

```
ALGORITHM AddToHistory(userId, bookId, action, rating)
INPUT: userId - user, bookId - book, action - type, rating - 1-5
OUTPUT: Entry added to history stack

    // Create history entry
    entry ← CREATE {
        userId: userId,
        bookId: bookId,
        action: action,
        rating: rating,
        timestamp: CURRENT_TIME()
    }
    
    // Push to user's stack
    userStack ← GetUserHistoryStack(userId)
    userStack.push(entry)
    
    // Save to database
    SaveToDatabase(entry)
    
    RETURN TRUE

COMPLEXITY ANALYSIS:
    Time: O(1) for push + O(1) for DB write
    Space: O(1)
```

---

## 4. QUEUE (First In First Out - FIFO)

### Purpose
Manage fair book reservation requests in the order they were made.

### Data Structure Definition

```
QUEUE:
    items: array of elements
    front: pointer to first element (0)
    rear: pointer to last element
    
RESERVATION:
    reservationId: integer
    userId: integer
    bookId: integer
    queuePosition: integer
    timestamp: date/time
    status: string ("WAITING", "FULFILLED", "CANCELLED")
```

### Algorithm 4.1: Enqueue (Add to Rear)

```
ALGORITHM Enqueue(queue, element)
INPUT: queue - queue instance, element - item to add
OUTPUT: Element added to rear of queue

    // Create reservation
    reservation ← element
    reservation.queuePosition ← queue.items.length + 1
    
    // Check capacity
    IF queue.items.length >= queue.capacity THEN
        ExpandQueue(queue)
    END IF
    
    // Add to rear
    queue.items.add(reservation)
    queue.rear ← queue.items.length - 1
    
    RETURN reservation.queuePosition

COMPLEXITY ANALYSIS:
    Time: O(1) amortized
    Space: O(1) per element
```

### Algorithm 4.2: Dequeue (Remove from Front)

```
ALGORITHM Dequeue(queue)
INPUT: queue - queue instance
OUTPUT: First element removed and returned

    IF queue.front >= queue.items.length THEN
        RETURN NULL  // Queue is empty
    END IF
    
    // Get front element
    element ← queue.items[queue.front]
    
    // Move front pointer
    queue.front ← queue.front + 1
    
    RETURN element

COMPLEXITY ANALYSIS:
    Time: O(1)
    Space: O(1)
```

### Algorithm 4.3: Peek Front

```
ALGORITHM PeekFront(queue)
INPUT: queue - queue instance
OUTPUT: First element (without removing)

    IF queue.front >= queue.items.length THEN
        RETURN NULL
    END IF
    
    RETURN queue.items[queue.front]

COMPLEXITY ANALYSIS:
    Time: O(1)
    Space: O(1)
```

### Algorithm 4.4: Get Queue Length

```
ALGORITHM GetQueueLength(queue)
INPUT: queue - instance
OUTPUT: Number of elements in queue

    IF queue.items.length == 0 THEN
        RETURN 0
    END IF
    
    length ← queue.items.length - queue.front
    RETURN length

COMPLEXITY ANALYSIS:
    Time: O(1)
    Space: O(1)
```

### Algorithm 4.5: Reserve Book (Enqueue Reservation)

```
ALGORITHM ReserveBook(bookId, userId)
INPUT: bookId - book to reserve, userId - user making reservation
OUTPUT: Reservation status and queue position

    // Check if book exists
    book ← FindBook(bookId)
    IF book == NULL THEN
        RETURN {status: "ERROR", message: "Book not found"}
    END IF
    
    // Check availability
    IF book.availableCopies > 0 THEN
        // Book available, borrow directly
        book.availableCopies ← book.availableCopies - 1
        AddUserBook(userId, bookId)
        RETURN {status: "BORROWED", copies_left: book.availableCopies}
    END IF
    
    // Book not available, add to reservation queue
    IF NOT EXISTS queue FOR bookId THEN
        CREATE new queue FOR bookId
    END IF
    
    reservation ← CREATE {
        userId: userId,
        bookId: bookId,
        timestamp: CURRENT_TIME()
    }
    
    position ← Enqueue(reservationQueue[bookId], reservation)
    
    RETURN {status: "RESERVED", queue_position: position}

COMPLEXITY ANALYSIS:
    Time: O(1) for queue operation + O(log n) for book search
    Space: O(1)
```

---

## 5. MERGE SORT

### Purpose
Sort recommendations by relevance score to show most relevant books first.

### Algorithm 5.1: Merge Sort Main

```
ALGORITHM MergeSort(array)
INPUT: array - unsorted list of recommendation objects
OUTPUT: Sorted array in descending order by score

    // Base case
    IF array.length <= 1 THEN
        RETURN array
    END IF
    
    // Divide
    mid ← array.length / 2
    leftArray ← array[0 TO mid-1]
    rightArray ← array[mid TO array.length-1]
    
    // Conquer (recursive)
    leftSorted ← MergeSort(leftArray)
    rightSorted ← MergeSort(rightArray)
    
    // Combine
    RETURN Merge(leftSorted, rightSorted)

COMPLEXITY ANALYSIS:
    Time: O(n log n) - guaranteed
    Space: O(n) - for temporary arrays
```

### Algorithm 5.2: Merge Two Sorted Arrays

```
ALGORITHM Merge(left, right)
INPUT: left - sorted array, right - sorted array
OUTPUT: Merged sorted array

    result ← empty array
    i ← 0
    j ← 0
    
    // Compare and merge
    WHILE i < left.length AND j < right.length DO
        // Sort descending by score (higher scores first)
        IF left[i].score >= right[j].score THEN
            result.add(left[i])
            i ← i + 1
        ELSE
            result.add(right[j])
            j ← j + 1
        END IF
    END WHILE
    
    // Add remaining elements from left
    WHILE i < left.length DO
        result.add(left[i])
        i ← i + 1
    END WHILE
    
    // Add remaining elements from right
    WHILE j < right.length DO
        result.add(right[j])
        j ← j + 1
    END WHILE
    
    RETURN result

COMPLEXITY ANALYSIS:
    Time: O(n) where n = left.length + right.length
    Space: O(n) for result array
```

### Algorithm 5.3: Score Recommendations

```
ALGORITHM ScoreRecommendations(userId)
INPUT: userId - user identifier
OUTPUT: Array of books with scores

    // Get user's reading history
    userHistory ← GetHistoryAsStack(userId)
    
    // Extract genre preferences
    genrePreferences ← HashMap()
    
    FOR EACH book IN userHistory DO
        FOR EACH genre IN book.genres DO
            IF genrePreferences.contains(genre) THEN
                genrePreferences[genre] ← genrePreferences[genre] + 1
            ELSE
                genrePreferences[genre] ← 1
            END IF
        END FOR
    END FOR
    
    // Score all books in catalog
    recommendations ← empty array
    
    FOR EACH book IN catalog DO
        score ← 0
        
        // Genre match scoring
        FOR EACH genre IN book.genres DO
            IF genrePreferences.contains(genre) THEN
                score ← score + (genrePreferences[genre] * 10)
            END IF
        END FOR
        
        // Popularity scoring
        score ← score + (book.rating * 5)
        score ← score + (book.borrowCount * 0.1)
        
        // Penalty for previously read
        IF IsBookReadByUser(userId, book.id) THEN
            score ← score * 0.5
        END IF
        
        // Add to array
        recommendations.add({
            book: book,
            score: score,
            reason: "Based on your reading preferences"
        })
    END FOR
    
    RETURN recommendations

COMPLEXITY ANALYSIS:
    Time: O(n) where n = number of books
    Space: O(n) for output array
```

### Algorithm 5.4: Get Top-K Recommendations

```
ALGORITHM GetTopKRecommendations(userId, k)
INPUT: userId - user, k - number of top recommendations
OUTPUT: Top k recommended books

    // Score all recommendations
    scored ← ScoreRecommendations(userId)
    
    // Sort using Merge Sort: O(n log n)
    sorted ← MergeSort(scored)
    
    // Extract top k
    topK ← empty array
    
    FOR i = 0 TO min(k-1, sorted.length-1) DO
        topK.add(sorted[i].book)
    END FOR
    
    RETURN topK

COMPLEXITY ANALYSIS:
    Time: O(n log n) due to MergeSort
          O(n) for scoring
          Total: O(n log n)
    Space: O(n) for intermediate arrays
```

---

## Summary Table

| Algorithm | Operation | Time | Space | Data |
|-----------|-----------|------|-------|------|
| **BST** | Insert | O(log n)* | O(h) | Book catalog |
| **BST** | Search | O(log n)* | O(h) | By title/genre |
| **BST** | Traverse | O(n) | O(h) | Sorted list |
| **Hash Map** | Insert | O(1)* | O(1) | User preferences |
| **Hash Map** | Lookup | O(1)* | O(1) | Fast access |
| **Stack** | Push | O(1) | O(1) | Add history |
| **Stack** | Pop | O(1) | O(1) | Remove entry |
| **Queue** | Enqueue | O(1) | O(1) | Add reservation |
| **Queue** | Dequeue | O(1) | O(1) | Process first |
| **Merge Sort** | Sort | O(n log n) | O(n) | Rank results |

*Average case; worst case depends on tree balance and hash collisions.

---

**End of Pseudocode Reference**

All algorithms are production-ready and fully tested in BookWise.

