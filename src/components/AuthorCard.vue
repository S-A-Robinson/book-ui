<script setup lang="ts">
import type { Author } from '../../models/models';
import InputButton from '@/components/InputButton.vue'

interface Props {
  author: Author,
}
const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-center p-4 rounded bg-slate-900 hover:scale-[1.02]">
    <div class="w-24 h-24 mb-4 rounded-full bg-slate-800"></div>
    <h1 class="text-2xl mb-4">{{ props.author.first_name }} {{ props.author.last_name}}</h1>
    <InputButton
      label="Delete"
      clickEvent="deleteAuthor"
      @delete-author="$emit('deleteAuthor', props.author.id)"
    />
  </div>
</template>
