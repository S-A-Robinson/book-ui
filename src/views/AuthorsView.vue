<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { deleteAuthor, getAuthors } from '@/api/api';
import type { Author } from '../../models/models';
import InputButton from '@/components/InputButton.vue';
import AuthorCard from '@/components/AuthorCard.vue';

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

async function deleteAuthorById(id: number) {
  const confirm = window.confirm(`Are you sure you want to delete this author?\nTHIS WILL DELETE ALL BOOKS ASSOCIATED WITH THIS AUTHOR!`);

  if (confirm) {
    try {
      await deleteAuthor(id);
      authors.value = await getAuthors();
      toast.success('Author deleted successfully.');
    } catch (error) {
      console.error('Error deleting author', error);
      toast.error('Error deleting author');
    }
  }
}

onMounted(async () => {
  await getAllAuthors();
});
</script>

<template>
  <main>
    <div class="px-4 md:px-20 py-4">
      <RouterLink to="/authors/add">
        <InputButton>Add New Author</InputButton>
      </RouterLink>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mx-4 md:mx-20">
      <AuthorCard
        v-for="author in authors" :key="author.id"
        :author="author"
        @delete-author="(id) => deleteAuthorById(id)"
      />
    </div>
  </main>
</template>
