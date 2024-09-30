<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div>
    <Navbar />
    <RouterView class="h-[calc(100vh-56px)]" />
  </div>
</template>
