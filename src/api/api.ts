import axios from 'axios';
import type { Author, BookWithAuthorDetails, BookWithAuthorID } from '../../models/models';

export async function getBooks(status?: string) {
  try {
    const response = await axios.get<BookWithAuthorDetails[]>(`http://localhost:8080/books${status ? `?status=${status}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books', error);
  }
}

export async function createBook(newBook: BookWithAuthorID) {
  try {
    await axios.post('/api/books', newBook);
  } catch(error) {
      console.error('Error creating book', error);
  }
}

export async function updateBook(id: number, status: string) {
  console.log(`updating book with id ${id} with status ${status}`);
  try {
    await axios.put(`/api/books/${id}`, { status: status });
  } catch(error) {
    console.error('Error updating book', error);
  }
}

export async function deleteBook(id: number) {
  try {
    await axios.delete(`/api/books/${id}`);
  } catch (error) {
    console.error('Error deleting book', error);
  }
}

export async function getAuthors() {
  try {
    const response = await axios.get<Author[]>('/api/authors');
    return response.data;
  } catch (error) {
    console.error('Error fetching authors', error);
  }
}

export async function createAuthor(newAuthor: Author) {
  try {
    const response = await axios.post<number>('/api/authors', newAuthor);
    return response.data;
  } catch(error) {
    console.error('Error creating author', error);
  }
}