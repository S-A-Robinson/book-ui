<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import { getBooks, updateBook, deleteBook, getStats } from '@/api/api'
import { debounce } from '@/utils/debounce'
import type { BookWithAuthorDetails } from '@/models/models'
import BookCard from '@/components/BookCard.vue'
import ButtonGroup from '@/components/ButtonGroup.vue'
import InputButton from '@/components/InputButton.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import InputField from '@/components/InputField.vue'

const books = ref<BookWithAuthorDetails[]>([])
const stats = ref({})
const isLoading = ref(true)
const isFiltering = ref(false)
const titleSearch = ref('')
const statusFilter = ref('')

const toast = useToast()

async function getBooksWithFilter(query?: { status?: string; title?: string }) {
  try {
    books.value = await getBooks(query)
  } catch (error) {
    console.error('Error fetching books', error)
    toast.error('Error fetching books')
  }
  isLoading.value = false
}

watch(
  titleSearch,
  debounce(
    async () => await getBooksWithFilter({ status: statusFilter.value, title: titleSearch.value }),
    300
  )
)

async function updateBookStatus(id: number, status: string) {
  try {
    await updateBook(id, status)
    toast.success('Book updated successfully.')
  } catch (error) {
    console.error('Error updating book', error)
    toast.error('Error updating book')
  }
}

async function deleteBookById(id: number) {
  const confirm = window.confirm(`Are you sure you want to delete this book?`)

  if (confirm) {
    try {
      await deleteBook(id)
      books.value = await getBooks()
      toast.success('Book deleted successfully.')
    } catch (error) {
      console.error('Error deleting book', error)
      toast.error('Error deleting book')
    }
  }
}

async function filterBooksByStatus(status: string) {
  isFiltering.value = status !== 'All'
  statusFilter.value = status
  await getBooksWithFilter({ status: status, title: titleSearch.value })
}

onMounted(async () => {
  await getBooksWithFilter()
  stats.value = await getStats()
})
</script>

<template>
  <div>
    <span v-if="isLoading">
      <MoonLoader />
    </span>
    <div v-else>
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 px-4 py-4 md:px-20"
      >
        <RouterLink to="/books/add">
          <InputButton>Add New Book</InputButton>
        </RouterLink>
        <div class="flex flex-row md:flex-col lg:flex-row mx-4">
          <span class="mr-8 text-nowrap">Pages: {{ stats.Pages }}</span>
          <span class="text-nowrap">Word Count: {{ stats.WordCount }}</span>
        </div>
        <InputField v-model="titleSearch" id="bookSearch" placeholder="search" type="text" />
        <ButtonGroup
          @button-pressed="filterBooksByStatus"
          :buttons="[
            {
              id: 'all-button',
              label: 'All'
            },
            {
              id: 'read-button',
              label: 'Read'
            },
            {
              id: 'reading-button',
              label: 'Reading'
            },
            {
              id: 'plan-to-read-button',
              label: 'Plan To Read'
            }
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
      <div v-else class="mx-4 grid grid-cols-1 gap-4 md:mx-20 md:grid-cols-2 lg:grid-cols-4">
        <BookCard
          v-for="book in books"
          :key="book.id"
          :book="book"
          :handleStatusChange="updateBookStatus"
          @delete-book="(id) => deleteBookById(id)"
        />
      </div>
    </div>
  </div>
</template>
