<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import axios from 'axios';

const state = reactive({
  authors: [],
  isLoading: true,
});

async function getAuthors() {
  try {
    const response = await axios.get('http://localhost:8080/authors');
    state.authors = response.data;
  } catch (error) {
    console.error('Error fetching authors', error);
  } finally {
    state.isLoading = false;
  }
}

onMounted(async () => {
  await getAuthors();
});
</script>

<template>
  <main>
    <h1 class="text-7xl">Authors</h1>
    <div v-for="author in state.authors" :key="author.id">
      <h1>{{ author.first_name + " " + author.last_name }}</h1>
    </div>
  </main>
</template>
