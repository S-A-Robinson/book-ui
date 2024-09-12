<script setup lang="ts">
interface Props {
  id: number,
  title: string,
  pages: number,
  wordCount: number,
  status: string,
  author: string,
}
  const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col justify-between min-h-48 bg-slate-900 rounded p-4 text-center">
    <h2 class="text-5xl mb-2">{{ props.title }}</h2>
    <h3>by {{ props.author }}</h3>
    <div class="flex flex-row justify-center gap-5">
      <span>pages: {{ props.pages }}</span>
      <span>words: {{ props.wordCount }}</span>
      <span>status: {{ props.status }}</span>
    </div>
    <button class="bg-slate-800" @click="$emit('deleteBook', props.id)">Delete</button>
  </div>
</template>