<script setup lang="ts">
import InputButton from '@/components/InputButton.vue'
</script>

<template>
  <main class="flex flex-col-reverse md:flex-row justify-around items-center h-fit md:h-[calc(100vh-56px)] mb-16 md:mb-0">
    <div class="flex flex-col items-center md:items-start md:w-1/2 mx-8">
      <h1 class="text-6xl md:text-8xl text-center md:text-left">Book Keeper</h1>
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
    <div class="flex justify-center w-64 h-64 md:min-w-96 md:min-h-96 m-8 rounded-full bg-white">
      <img src="/bookshelf.png" alt="a stack of books" />
    </div>
  </main>
</template>
