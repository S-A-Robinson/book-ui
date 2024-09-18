import AuthorsView from '@/views/AuthorsView.vue';
import AddAuthorView from '@/views/AddAuthorView.vue';

export default [
  {
    path: '/authors',
    name: 'authors',
    component: AuthorsView
  },
  {
    path: '/authors/add',
    name: 'add-authors',
    component: AddAuthorView
  },
]