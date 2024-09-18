<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useField, useForm } from 'vee-validate';
import { useRoute } from 'vue-router';
import router from '@/router';
import { createBook, getAuthors } from '@/api/api';
import InputField from '@/components/InputField.vue';
import InputSelect from '@/components/InputSelect.vue';
import InputButton from '@/components/InputButton.vue';

const authorsAsOptions = ref([]);
const isLoading = ref(true);
const formSection = ref(1);

const toast = useToast();
const route = useRoute();

const validationSchema = {
  title: (value) => {
    if (!value) return 'This field is required'
    if (value.length > 100) return 'The length must not exceed 100'
    return true
  },
  pages: (value) => {
    if (!value) return 'This field is required'
    return true
  },
  word_count: (value) => {
    if (!value) return 'This field is required'
    return true
  },
  status: undefined,
  author_id: undefined
}

const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema,
  initialValues: {
    status: 'Read'
  }
});

const { value: title } = useField<string>('title');
const { value: pages } = useField<number>('pages');
const { value: word_count } = useField<number>('word_count');
const { value: status } = useField<string>('status');
const { value: author_id } = useField<number>('author_id');

const submit = handleSubmit(async values => {
  try {
    await createBook(values);
    await router.push('/books');
    toast.success('Book created successfully.');
  } catch (error) {
    console.error('Error creating book', error);
    toast.error('Error creating book');
  }
})

onMounted(async () => {
  try {
    const retrievedAuthors = await getAuthors();

    retrievedAuthors.map((author) => {
      authorsAsOptions.value.push({
        value: author.id,
        label: author.first_name + ' ' + author.last_name
      });
    });

    if (route.query.author_id) {
      setFieldValue('author_id', parseInt(route.query.author_id));
      formSection.value = 2;
    } else {
      setFieldValue('author_id', authorsAsOptions.value[0].value);
    }
  } catch (error) {
    console.error('Error fetching authors', error)
  } finally {
    isLoading.value = false;
  }
})
</script>

<template>
  <transition
    enter-active-class="duration-300 ease-out delay-300"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div v-if="formSection === 1" class="w-1/2 mx-auto text-center mt-32">
      <h1 class="text-2xl mb-32">Is this book from an existing author?</h1>
      <div class="flex justify-between">
        <InputButton
          clickEvent="existingAuthor"
          @existing-author="() => formSection = 2"
        >
          Existing Author
        </InputButton>
        <RouterLink to="/authors/add?creatingBook=true">
          <InputButton>Add New Author</InputButton>
        </RouterLink>
      </div>
    </div>
    <div v-else-if="formSection === 2" class="w-1/4 mx-auto mt-16">
      <InputButton
        clickEvent="back"
        @back="() => formSection = 1"
      >
        Back
      </InputButton>
      <h1 class="text-5xl text-center mt-16">Add New Book</h1>

      <form @submit="submit">
        <fieldset class="flex flex-col gap-4 my-8">
          <legend class="text-2xl mb-4">Book Details</legend>

          <InputField
            v-model="title"
            id="bookTitle"
            label="Title"
            placeholder="Of Mice and Men"
            type="text"
            :error="errors.title"
          />

          <InputField
            v-model="pages"
            id="bookPages"
            label="Pages"
            placeholder="200"
            type="number"
            :error="errors.pages"
          />

          <InputField
            v-model="word_count"
            id="bookWordCount"
            label="Word Count"
            placeholder="50000"
            type="number"
            :error="errors.word_count"
          />

          <InputSelect
            v-model="status"
            id="readingStatus"
            label="Status"
            :options="[
            { value: 'Read', label: 'Read' },
            { value: 'Reading', label: 'Reading' },
            { value: 'Plan To Read', label: 'Plan To Read' }
          ]"
          />
        </fieldset>

        <fieldset class="flex flex-col gap-4">
          <InputSelect
            v-model="author_id"
            id="isNewAuthor"
            label="Add Author"
            :options="authorsAsOptions"
          />
        </fieldset>

        <InputButton class="mt-8" label="Submit" />
      </form>
    </div>
  </transition>
</template>