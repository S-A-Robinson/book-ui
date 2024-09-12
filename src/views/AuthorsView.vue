<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import { getAuthors } from '@/api/api';

  const state = reactive({
    authors: [],
    isLoading: true,
  });

  async function getAllAuthors() {
    state.authors = await getAuthors().then(
      state.isLoading = false
    );
  }

onMounted(async () => {
  await getAllAuthors();
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
