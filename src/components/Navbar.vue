<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <nav class="flex flex-row justify-center h-14 bg-slate-900">
    <RouterLink
      to="/"
      :class="`p-4 ${isActiveLink('/') ? 'bg-slate-950' : 'hover:bg-slate-800'}`"
    >
      Home
    </RouterLink>
    <RouterLink
      to="/books"
      :class="`p-4 ${isActiveLink('/books') ? 'bg-slate-950' : 'hover:bg-slate-800'}`"
    >
      Books
    </RouterLink>
    <RouterLink
      to="/authors"
      :class="`p-4 ${isActiveLink('/authors') ? 'bg-slate-950' : 'hover:bg-slate-800'}`"
    >
      Authors
    </RouterLink>
  </nav>
</template>