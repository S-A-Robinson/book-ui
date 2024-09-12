import axios from 'axios';

export async function getBooks(status?: string) {
  try {
    const response = await axios.get(`http://localhost:8080/books${status ? `?status=${status}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books', error);
  }
}

export async function createBook(newBook) {
  try {
    await axios.post('http://localhost:8080/books', newBook);
  } catch(error) {
      console.error('Error creating book', error);
  }
}

export async function deleteBook(id: number) {
  try {
    await axios.delete(`http://localhost:8080/books/${id}`);
  } catch (error) {
    console.error('Error deleting book', error);
  }
}

export async function getAuthors() {
  try {
    const response = await axios.get('http://localhost:8080/authors');
    return response.data;
  } catch (error) {
    console.error('Error fetching authors', error);
  }
}

export async function createAuthor(newAuthor) {
  try {
    const response = await axios.post('http://localhost:8080/authors', newAuthor);
    return response.data;
  } catch(error) {
    console.error('Error creating author', error);
  }
}