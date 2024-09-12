<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import router from '@/router'
import axios from 'axios'
import InputField from '@/components/InputField.vue'
import InputSelect from '@/components/InputSelect.vue'

const isNewAuthor = ref('existing');
const authors = ref([]);
const authorsAsOptions = ref([]);
const isLoading = ref(true);

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

    response.data.map(author => {
      console.log(author);
      authorsAsOptions.value.push({
        value: author.author_id,
        label: author.first_name + ' ' + author.last_name,
      })
      console.log(authorsAsOptions.value)
    })
  } catch (error) {
    console.error('Error fetching authors', error);
  } finally {
    isLoading.value = false;
  }
})
</script>

<template>
  <div class="w-1/2 mx-auto">
    <h1 class="text-7xl text-center">Add New Book</h1>

    <form @submit.prevent="handleSubmit">
      <fieldset class="flex flex-col gap-4 my-8">
        <legend class="text-2xl mb-4">Book Details</legend>

        <InputField
          v-model="form.book.title"
          id="bookTitle"
          label="Title"
          placeholder="Of Mice and Men"
          type="text"
        />

        <InputField
          v-model="form.book.pages"
          id="bookPages"
          label="Pages"
          placeholder="200"
          type="number"
        />

        <InputField
          v-model="form.book.word_count"
          id="bookWordCount"
          label="Word Count"
          placeholder="50000"
          type="number"
        />

        <InputSelect
          v-model="form.book.status"
          id="readingStatus"
          label="Status"
          :options="[
            { value: 'Read', label: 'Read' },
            { value: 'Reading', label: 'Reading' },
            { value: 'Plan To Read', label: 'Plan To Read' },
          ]"
        />
      </fieldset>

      <fieldset class="flex flex-col gap-4">
        <legend class="text-2xl mb-4">Author Details</legend>
        <div>
          <label for="existingAuthor">Existing Author</label>
          <input type="radio" id="existingAuthor" value="existing" v-model="isNewAuthor" checked />
          <label for="newAuthor">New Author</label>
          <input type="radio" id="newAuthor" value="new" v-model="isNewAuthor" />
        </div>

        <InputSelect
          v-model="form.existingAuthorID"
          v-if="isNewAuthor == 'existing'"
          id="isNewAuthor"
          label="Add Author"
          :options="authorsAsOptions"
        />

        <div v-else class="flex flex-col gap-4">
          <InputField
            v-model="form.author.first_name"
            id="authorFirstName"
            label="First Name"
            placeholder="John"
            type="text"
          />

          <InputField
            v-model="form.author.last_name"
            id="authorLastName"
            label="Last Name"
            placeholder="Steinbeck"
            type="text"
          />
        </div>
      </fieldset>

      <button type="submit" class="bg-slate-800 rounded px-4 py-2 mt-8">Submit</button>
    </form>
  </div>
</template>