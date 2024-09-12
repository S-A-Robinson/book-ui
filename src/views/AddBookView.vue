<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import router from '@/router'
import axios from 'axios'

const isNewAuthor = ref('existing');
const authors = ref([]);

const form = reactive({
  book: {
    title: '',
    pages: null,
    word_count: null,
    status: 'Read',
  },
  existingAuthorID: null,
  author: {
    first_name: '',
    last_name: ''
  }
})

async function handleSubmit() {
  if (isNewAuthor.value == 'existing') {
    axios.post('http://localhost:8080/books', {...form.book, author_id: form.existingAuthorID})
      .then(() => {
        router.push('/books');
      })
      .catch(error => {
        console.error('Error creating book', error);
      });
  } else {
    axios.post('http://localhost:8080/authors', form.author)
      .then(async (response) => {
        const authorID = response.data;
        await axios.post('http://localhost:8080/books', {
          ...form.book,
          author_id: authorID
        });

        await router.push('/books');
      })
      .catch(error => {
        console.error('Error creating book', error);
      });
  }
}

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/authors');
    authors.value = response.data;
  } catch (error) {
    console.error('Error fetching authors', error);
  }
})
</script>

<template>
  <div class="w-1/2 mx-auto">
    <h1 class="text-7xl text-center">Add New Book</h1>

    <form @submit.prevent="handleSubmit">
      <fieldset class="flex flex-col gap-4 my-8">
        <legend class="text-2xl mb-4">Book Details</legend>

        <label for="title">Title</label>
        <input
          v-model="form.book.title"
          id="title"
          class="text-black"
          type="text"
          placeholder="Of Mice and Men"
        />
        <label for="pages">Pages</label>

        <input v-model="form.book.pages" id="pages" class="text-black" type="number" placeholder="200" />
        <label for="word-count">Word Count</label>
        <input
          v-model="form.book.word_count"
          id="word-count"
          class="text-black"
          type="number"
          placeholder="50000"
        />

        <label for="status">Status</label>
        <select v-model="form.book.status" id="status" class="text-black">
          <option value="Read">Read</option>
          <option value="Reading">Reading</option>
          <option value="Plan To Read">Plan To Read</option>
        </select>
      </fieldset>

      <fieldset class="flex flex-col gap-4">
        <legend class="text-2xl mb-4">Author Details</legend>
        <div>
          <label for="existingAuthor">Existing Author</label>
          <input type="radio" id="existingAuthor" value="existing" v-model="isNewAuthor" checked />
          <label for="newAuthor">New Author</label>
          <input type="radio" id="newAuthor" value="new" v-model="isNewAuthor" />
        </div>

        <select v-if="isNewAuthor == 'existing'" v-model="form.existingAuthorID" class="text-black">
          <option v-for="author in authors" :key="author.author_id" :value="author.author_id">{{ author.first_name }} {{ author.last_name }}</option>
        </select>

        <div v-else>
          <label for="title">First Name</label>
          <input
            v-model="form.author.first_name"
            id="title"
            class="text-black"
            type="text"
            placeholder="John"
          />

          <label for="title">Last Name</label>
          <input
            v-model="form.author.last_name"
            id="title"
            class="text-black"
            type="text"
            placeholder="Steinbeck"
          />
        </div>
      </fieldset>

      <button type="submit" class="bg-slate-800 rounded px-4 py-2">Submit</button>
    </form>
  </div>
</template>