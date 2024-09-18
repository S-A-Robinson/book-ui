<script setup lang="ts">
import type { Author } from '../../models/models';
import InputButton from '@/components/InputButton.vue'

interface Props {
  author: Author,
}
const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-center rounded bg-slate-900 p-4 hover:scale-[1.02]">
    <img class="mb-4 h-24 w-24 rounded-full bg-slate-800 object-cover" :src="author.image_url" alt="author image"/>
    <h1 class="mb-4 text-2xl">{{ props.author.first_name }} {{ props.author.last_name}}</h1>
    <InputButton
      label="Delete"
      clickEvent="deleteAuthor"
      @delete-author="$emit('deleteAuthor', props.author.id)"
    />
  </div>
</template>
