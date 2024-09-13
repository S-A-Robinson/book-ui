<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import router from '@/router';
import InputField from '@/components/InputField.vue';
import InputSelect from '@/components/InputSelect.vue';
import { createBook, createAuthor, getAuthors } from '@/api/api';
import type { BookWithAuthorID } from '../../models/models';
import InputButton from '@/components/InputButton.vue';

const isNewAuthor = ref('existing');
const authors = ref([]);
const authorsAsOptions = ref([]);
const isLoading = ref(true);

const toast = useToast();

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
    await createBook({...form.book, author_id: form.existingAuthorID} as BookWithAuthorID)
      .then(() => {
        router.push('/books');
        toast.success('Book created successfully.');
      });
  } else {
    await createAuthor(form.author)
      .then(async (newAuthorID) => {
        await createBook({
          ...form.book,
          author_id: newAuthorID
        });
      })
      .then(async () => {
        await router.push('/books');
        toast.success('Book created successfully.');
      })
      .catch(error => {
        console.error('Error creating book', error);
        toast.error('Error creating book');
      });
  }
}

onMounted(async () => {
  try {
    const retrievedAuthors = await getAuthors();
    authors.value = retrievedAuthors;

    retrievedAuthors.map(author => {
      authorsAsOptions.value.push({
        value: author.author_id,
        label: author.first_name + ' ' + author.last_name,
      })
    });

    form.existingAuthorID = retrievedAuthors[0].author_id;
  } catch (error) {
    console.error('Error fetching authors', error);
  } finally {
    isLoading.value = false;
  }
})
</script>

<template>
  <div class="w-1/4 mx-auto">
    <h1 class="text-5xl text-center mt-16">Add New Book</h1>

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

      <InputButton
        class="mt-8"
        label="Submit"
      />
    </form>
  </div>
</template>