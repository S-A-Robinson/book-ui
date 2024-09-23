import axios from 'axios';
import type { Author, BookWithAuthorDetails, Book } from '../../models/models';

export async function getBooks(query?: {status?: string, title?: string}) {
  let queryString;

  if (query) {
    if (query.status === 'All') query.status = null;

    if (query.status && query.title) {
      queryString = `?status=${query.status}&title=${query.title}`;
    } else if (query.status && !query.title) {
      queryString = `?status=${query.status}`;
    } else if (!query.status && query.title) {
      queryString = `?title=${query.title}`;
    }
  }

  const response = await axios.get<BookWithAuthorDetails[]>(`http://localhost:8080/books${queryString ? queryString : ''}`);
  return response.data;
}

export async function createBook(newBook: Book) {
  await axios.post('/api/books', newBook);
}

export async function updateBook(id: number, status: string) {
  await axios.put(`/api/books/${id}`, { status: status });
}

export async function deleteBook(id: number) {
  await axios.delete(`/api/books/${id}`);
}

export async function getAuthors() {
  const response = await axios.get<Author[]>('/api/authors');
  return response.data;
}

export async function createAuthor(newAuthor: Author) {
  const response = await axios.post<number>('/api/authors', newAuthor);
  return response.data;
}

export async function deleteAuthor(id: number) {
  await axios.delete(`/api/authors/${id}`);
}

export async function getStats() {
  const response = await axios.get('/api/stats');
  return response.data;
}