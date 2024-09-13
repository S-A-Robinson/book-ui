<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import BookCard from '@/components/BookCard.vue';
import StatusButtonGroup from '@/components/StatusButtonGroup.vue';
import { getBooks, updateBook, deleteBook } from '@/api/api';
import InputButton from '@/components/InputButton.vue';
import type { BookWithAuthorDetails } from '../../models/models';

const books = ref<BookWithAuthorDetails[]>([]);
const isLoading = ref(true);

const toast = useToast();

async function getAllBooks() {
  books.value = await getBooks();
  isLoading.value = false;
}

async function updateBookStatus(id: number, status: string) {
  await updateBook(id, status);
  toast.success('Book updated successfully.');
}

async function deleteBookById(id: number) {
  const confirm = window.confirm(`Are you sure you want to delete this book?`);

  if (confirm) {
    await deleteBook(id);
    books.value = await getBooks();
    toast.success('Book deleted successfully.');
  }
}

async function filterBooksByStatus(status: string) {
  books.value = await getBooks(status);
}

onMounted(async () => {
  await getAllBooks();
});
</script>

<template>
  <span v-if="isLoading">Loading...</span>

  <span v-else-if="!isLoading && books.length === 0">This is the start of your collection! Click the 'Add New Book button to add your first book.'</span>

  <div v-else class="flex flex-row justify-between items-center w-svw px-4 md:px-20 py-4">
    <RouterLink to="/books/add">
      <InputButton>Add New Book</InputButton>
    </RouterLink>
    <StatusButtonGroup @filter-status="(status) => filterBooksByStatus(status)" />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 md:mx-20">
    <BookCard
      v-for="book in books" :key="book.book_id"
      :book="book"
      :handleStatusChange="updateBookStatus"
      @delete-book="(id) => deleteBookById(id)"
    />
  </div>
</template>