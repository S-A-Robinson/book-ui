<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import axios from 'axios';
import DetailsCard from '@/components/BookCard.vue'
import StatusButtonGroup from '@/components/StatusButtonGroup.vue'

const state = reactive({
  books: [],
  status: '',
  isLoading: true,
});

async function getBooks() {
  try {
    const response = await axios.get(`http://localhost:8080/books${state.status ? `?status=${state.status}` : ''}`);
    state.books = response.data;
  } catch (error) {
    console.error('Error fetching books', error);
  } finally {
    state.isLoading = false;
  }
}

async function deleteBook(id: number) {
  try {
    await axios.delete(`http://localhost:8080/books/${id}`);
    await getBooks();
  } catch (error) {
    console.error('Error deleting book', error);
  } finally {
    state.isLoading = false;
  }
}

async function filterBooksByStatus(status: string) {
  state.status = status;

  await getBooks();
}

onMounted(async () => {
  await getBooks()
});
</script>

<template>
  <span v-if="state.isLoading">Loading...</span>

  <div v-else class="flex flex-row justify-between items-center w-svw">
    <h1 class="text-7xl ml-20 my-4">Books</h1>
    <RouterLink to="/books/add">
      <button class="bg-slate-800 rounded px-4 py-2">Add New Book</button>
    </RouterLink>
    <div class="mr-20">
      <StatusButtonGroup @filter-status="(status) => filterBooksByStatus(status)" />
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 md:mx-20">
    <DetailsCard
      v-for="book in state.books" :key="book.book_id"
      :id="book.book_id"
      :title="book.title"
      :pages="book.pages"
      :wordCount="book.word_count"
      :status="book.status"
      :author="book.author.first_name + ' ' + book.author.last_name"
      @delete-book="(id) => deleteBook(id)"
    />
  </div>
</template>