<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios';

const statusFilter = ref('all');

const state = reactive({
  books: [],
  isLoading: true,
});

const bookDescription = ref('Here is a description of the book. It is pretty long and should probably be wrapped and if it gets too long then it should be cut off and have an ellipses');

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/books');
    state.books = response.data;
  } catch (error) {
    console.error('Error fetching books', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <span v-if="state.isLoading">Loading...</span>
  <div v-else class="flex flex-row items-center w-svw">
    <h1 class="text-7xl text-white ml-20 my-4">Books</h1>
    <div class="justify-self-flex-end">
      <label class="text-white" for="statusFilter">Status Filter</label>
      <select id="statusFilter">
        <option title="all" value="all">All</option>
        <option title="read" value="read">Read</option>
        <option title="reading" value="reading">Reading</option>
        <option title="plan to read" value="plan to read">Plan to Read</option>
      </select>
    </div>
  </div>
  <div class="grid grid-cols-4 gap-4 mx-20 text-white">
    <div v-for="book in state.books" :key="book.id" class="w-full h-fit bg-slate-900 rounded p-4 text-center">
      <h2 class="text-5xl mb-2">{{ book.Title }}</h2>
      <h3>by {{ book.Author.FirstName }} {{ book.Author.LastName }}</h3>
      <p class="h-24 my-4 line-clamp-4">{{ bookDescription }}</p>
      <div class="flex flex-row justify-center gap-5">
        <span>pages: {{ book.Pages }}</span>
        <span>words: {{ book.WordCount }}</span>
        <span>status: {{ book.Status }}</span>
      </div>
    </div>
  </div>
</template>