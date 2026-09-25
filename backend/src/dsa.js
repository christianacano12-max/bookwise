// Data Structures and Algorithms used by the application.

// 1. Queue — FIFO reservation processing.
export class ReservationQueue {
  constructor(items = []) { this.items = [...items]; }
  enqueue(item) { this.items.push(item); }
  dequeue() { return this.items.shift() ?? null; }
  peek() { return this.items[0] ?? null; }
  get length() { return this.items.length; }
}

// 2. Stack — LIFO interaction/borrowing history.
export class HistoryStack {
  constructor(items = []) { this.items = [...items]; }
  push(item) { this.items.push(item); }
  pop() { return this.items.pop() ?? null; }
  peek() { return this.items[this.items.length - 1] ?? null; }
  values() { return [...this.items].reverse(); }
}

// 3. Binary Search Tree — title searching.
class Node {
  constructor(book) { this.book = book; this.left = null; this.right = null; }
}
export class BookBST {
  constructor() { this.root = null; }

  insert(book) {
    const node = new Node(book);
    if (!this.root) { this.root = node; return; }
    let current = this.root;
    while (true) {
      if (book.title.toLowerCase() < current.book.title.toLowerCase()) {
        if (!current.left) { current.left = node; return; }
        current = current.left;
      } else {
        if (!current.right) { current.right = node; return; }
        current = current.right;
      }
    }
  }

  searchPrefix(prefix) {
    const out = [];
    const p = prefix.toLowerCase();
    const walk = (node) => {
      if (!node) return;
      if (node.book.title.toLowerCase().startsWith(p)) out.push(node.book);
      walk(node.left);
      walk(node.right);
    };
    walk(this.root);
    return out;
  }
}

// 4. Merge Sort — O(n log n) sorting.
export function mergeSort(array, compare) {
  if (array.length <= 1) return array;
  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid), compare);
  const right = mergeSort(array.slice(mid), compare);
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j]) <= 0) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}

// 5. Hash Map — fast key lookup / genre frequency.
export function genreFrequency(books) {
  const map = new Map();
  for (const book of books) map.set(book.genre, (map.get(book.genre) || 0) + 1);
  return map;
}
