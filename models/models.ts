export interface BaseBook {
  book_id: number;
  title: string;
  pages: number;
  word_count: number;
  status: string;
}

export interface BookWithAuthorDetails extends BaseBook {
  author: Author;
}

export interface BookWithAuthorID extends BaseBook {
  author_id: number;
}

export interface Author {
  author_id: number;
  first_name: string;
  last_name: string;
}