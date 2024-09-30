<script setup lang="ts">
import InputSelect from '@/components/InputSelect.vue'
import { ref } from 'vue'
import InputButton from '@/components/InputButton.vue'
import type { BookWithAuthorDetails } from '@/models/models'

interface Props {
  book: BookWithAuthorDetails
  handleStatusChange(bookID: number, status: string)
}
const props = defineProps<Props>()

const currentStatus = ref(props.book.status)
</script>

<template>
  <div
    class="flex flex-col justify-between rounded bg-slate-900 p-4 text-center transition-transform hover:scale-[1.02]"
  >
    <div class="my-auto">
      <h2 class="mb-2 text-4xl">{{ props.book.title }}</h2>
      <h3>by {{ props.book.author.first_name }} {{ props.book.author.last_name }}</h3>
    </div>
    <div class="mt-2">
      <div class="rounded bg-slate-800 py-2">
        <h2>Stats</h2>
        <div>
          <span>pages: {{ props.book.pages }}</span>
          <span class="ml-4">words: {{ props.book.word_count }}</span>
        </div>
      </div>
      <div class="mt-2 flex items-end justify-between gap-1">
        <InputSelect
          v-model="currentStatus"
          @update:modelValue="(newStatus) => handleStatusChange(props.book.id, newStatus)"
          :id="props.book.title + '-status'"
          label="status"
          :options="[
            { value: 'Read', label: 'Read' },
            { value: 'Reading', label: 'Reading' },
            { value: 'Plan To Read', label: 'Plan To Read' }
          ]"
        />
        <InputButton
          label="Delete"
          clickEvent="deleteBook"
          @delete-book="$emit('deleteBook', props.book.id)"
        />
      </div>
    </div>
  </div>
</template>
