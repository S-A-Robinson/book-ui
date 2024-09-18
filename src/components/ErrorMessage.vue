<script setup lang="ts">
interface Props {
  title: string,
  message: string,
}

const props = defineProps<Props>();
</script>

<template>
  <div class="mt-32 text-center">
    <h1 class="mb-4 text-5xl">{{ props.title }}</h1>
    <p>{{ props.message }}</p>
  </div>
</template>