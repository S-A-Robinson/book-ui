<script setup lang="ts">
interface Props {
  title: string,
  message: string,
}

const props = defineProps<Props>();
</script>

<template>
  <div class="mt-32 text-center">
    <h1 class="text-5xl mb-4">{{ props.title }}</h1>
    <p>{{ props.message }}</p>
  </div>
</template>