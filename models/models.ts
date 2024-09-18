export interface Book {
  id: number;
  author_id: number;
  title: string;
  pages: number;
  word_count: number;
  status: string;
}

export interface BookWithAuthorDetails extends Book {
  author: Author;
}

export interface Author {
  id: number;
  first_name: string;
  last_name: string;
}