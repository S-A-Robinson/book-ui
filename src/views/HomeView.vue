<script setup lang="ts">
import InputButton from '@/components/InputButton.vue'
</script>

<template>
  <main class="flex justify-around items-center">
    <div class="w-1/2">
      <h1 class="text-8xl">Book Keeper</h1>
      <p class="text-lg my-16">
        Dive into the ultimate reading experience where you can effortlessly track the books you've read, plan your next literary adventure,
        and uncover insightful stats about your reading journey.
        Whether you're a voracious reader or just getting started, Book Keeper is here to help you organize your book lists, celebrate your reading achievements, and discover your next great read.
        Start exploring your reading world with us today!
      </p>
      <RouterLink to="/books">
        <InputButton>Get Started</InputButton>
      </RouterLink>
    </div>
    <div class="flex justify-center w-96 h-96 rounded-full bg-white">
      <img src="/bookshelf.png" alt="a stack of books" />
    </div>
  </main>
</template>
