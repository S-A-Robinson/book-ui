<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div>
    <nav class="flex flex-row justify-center h-14 bg-slate-900">
      <RouterLink to="/" class="p-4 hover:bg-slate-800">Home</RouterLink>
      <RouterLink to="/books" class="p-4 hover:bg-slate-800">Books</RouterLink>
      <RouterLink to="/authors" class="p-4 hover:bg-slate-800">Authors</RouterLink>
    </nav>
    <RouterView class="h-[calc(100vh-56px)]" />
  </div>
</template>
