<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import BookCard from '@/components/BookCard.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';
import { getBooks, updateBook, deleteBook } from '@/api/api';
import InputButton from '@/components/InputButton.vue';
import type { BookWithAuthorDetails } from '../../models/models';
import ErrorMessage from '@/components/ErrorMessage.vue'

const books = ref<BookWithAuthorDetails[]>([]);
const isLoading = ref(true);
const isFiltering = ref(false);

const toast = useToast();

async function getAllBooks() {
  try {
    books.value = await getBooks();
  } catch (error) {
    console.error('Error fetching books', error);
    toast.error('Error fetching books');
  }
  isLoading.value = false;
}

async function updateBookStatus(id: number, status: string) {
  try {
    await updateBook(id, status);
    toast.success('Book updated successfully.');
  } catch (error) {
    console.error('Error updating book', error);
    toast.error('Error updating book');
  }
}

async function deleteBookById(id: number) {
  const confirm = window.confirm(`Are you sure you want to delete this book?`);

  if (confirm) {
    try {
      await deleteBook(id);
      books.value = await getBooks();
      toast.success('Book deleted successfully.');
    } catch (error) {
      console.error('Error deleting book', error);
      toast.error('Error deleting book');
    }
  }
}

async function filterBooksByStatus(status: string) {
  isFiltering.value = status !== 'All';
  books.value = await getBooks(status);
}

onMounted(async () => {
  await getAllBooks();
});
</script>

<template>
  <div>
    <span v-if="isLoading">Loading...</span>

    <div v-else class="flex flex-row justify-between items-center px-4 md:px-20 py-4">
      <RouterLink to="/books/add">
        <InputButton>Add New Book</InputButton>
      </RouterLink>
      <ButtonGroup
        @button-pressed="filterBooksByStatus"
        :buttons="[
        {
          id: 'all-button',
          label: 'All',
        },
        {
          id: 'read-button',
          label: 'Read',
        },
        {
          id: 'reading-button',
          label: 'Reading',
        },
        {
          id: 'plan-to-read-button',
          label: 'Plan To Read',
        },
      ]"
      />
    </div>
    <ErrorMessage
      v-if="books.length === 0 && !isFiltering"
      title="No Books Found"
      message="Click the 'Add New Book' button to add your first book!"
    />
    <ErrorMessage
      v-else-if="books.length === 0 && isFiltering"
      title="No Books With That Status"
      message="You don't seem to have any books with that reading status. Try using a different filter or update the status of one of your books."
    />
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 md:mx-20">
      <BookCard
        v-for="book in books" :key="book.id"
        :book="book"
        :handleStatusChange="updateBookStatus"
        @delete-book="(id) => deleteBookById(id)"
      />
    </div>
  </div>
</template>