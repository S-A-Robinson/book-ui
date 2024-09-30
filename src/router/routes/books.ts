import BooksView from '@/views/BooksView.vue'
import AddBookView from '@/views/AddBookView.vue'

export default [
  {
    path: '/books',
    name: 'books',
    component: BooksView
  },
  {
    path: '/books/add',
    name: 'add-books',
    component: AddBookView
  }
]
