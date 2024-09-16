<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import { getAuthors } from '@/api/api';
  import type { Author } from '../../models/models';

  const authors = ref<Author[]>([]);
  const isLoading = ref(true);

  const toast = useToast();

  async function getAllAuthors() {
    try {
      authors.value = await getAuthors();
      isLoading.value = false;
    } catch (error) {
      console.error('Error fetch authors', error);
      toast.error('Error fetching authors');
    }
  }

onMounted(async () => {
  await getAllAuthors();
});
</script>

<template>
  <main>
    <h1 class="text-7xl">Authors</h1>
    <div v-for="author in authors" :key="author.id">
      <h1>{{ author.first_name + " " + author.last_name }}</h1>
    </div>
  </main>
</template>
