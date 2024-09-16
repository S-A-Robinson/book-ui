import axios from 'axios';
import type { Author, BookWithAuthorDetails, BookWithAuthorID } from '../../models/models';

export async function getBooks(status?: string) {
  const response = await axios.get<BookWithAuthorDetails[]>(`http://localhost:8080/books${status ? `?status=${status}` : ''}`);
  return response.data;
}

export async function createBook(newBook: BookWithAuthorID) {
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