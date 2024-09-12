<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <nav class="flex flex-row justify-center divide-x bg-slate-900">
      <RouterLink to="/" class="p-4">Home</RouterLink>
      <RouterLink to="/books" class="p-4">Books</RouterLink>
      <RouterLink to="/authors" class="p-4">Authors</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
