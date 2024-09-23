<script setup lang="ts">
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import { string, object } from 'yup';
import router from '@/router';
import { createAuthor } from '@/api/api';
import InputField from '@/components/InputField.vue';
import InputButton from '@/components/InputButton.vue';

const toast = useToast();
const route = useRoute();

const validationSchema = object({
  first_name: string().max(100).required(),
  last_name: string().max(100).required(),
  image_url: string().url().required(),
})

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: first_name } = useField<string>('first_name');
const { value: last_name } = useField<string>('last_name');
const { value: image_url } = useField<string>('image_url');

const submit = handleSubmit(async values => {
  try {
    const newAuthorID = await createAuthor(values);
    if (route.query.creatingBook === 'true') {
      await router.push(`/books/add?author_id=${newAuthorID}`);
    } else {
      await router.push('/authors');
    }
    toast.success('Author created successfully.');
  } catch (error) {
    console.error('Error creating author', error);
    toast.error('Error creating author');
  }
})
</script>

<template>
  <div class="mx-auto mt-16 px-8 md:w-1/2 lg:w-1/4">
    <h1 class="mt-16 text-center text-5xl">Add New Author</h1>
    <form @submit="submit" class="my-8 flex flex-col gap-4">
      <InputField
        v-model="first_name"
        id="authorFirstName"
        label="First Name"
        placeholder="John"
        type="text"
        :error="errors.first_name"
      />

      <InputField
        v-model="last_name"
        id="authorLastName"
        label="Last Name"
        placeholder="Steinbeck"
        type="text"
        :error="errors.last_name"
      />

      <InputField
        v-model="image_url"
        id="authorImageURL"
        label="Image Url"
        placeholder="http://www.source-image.com"
        type="url"
        :error="errors.image_url"
      />

      <InputButton class="mt-8" label="Submit" />
    </form>
  </div>
</template>