<script setup lang="ts">
import { ref, computed } from 'vue';
import InputButton from '@/components/InputButton.vue';
import { useMouse } from '@/composables/mouse.js';

const isHovered = ref(false);
const { x, y } = useMouse();

const clampedY = computed(() => {
  return Math.max(56, y.value);
})
</script>

<template>
  <main class="flex flex-col-reverse md:flex-row justify-around items-center h-fit md:h-[calc(100vh-56px)] mb-16 md:mb-0 cursor-none">
    <div class="mx-8 flex flex-col items-center md:w-1/2 md:items-start">
      <h1 class="text-center text-6xl md:text-left md:text-8xl">Book Keeper</h1>
      <p class="my-16 text-lg">
        Dive into the ultimate reading experience where you can effortlessly track the books you've read, plan your next literary adventure,
        and uncover insightful stats about your reading journey.
        Whether you're a voracious reader or just getting started, Book Keeper is here to help you organize your book lists, celebrate your reading achievements, and discover your next great read.
        Start exploring your reading world with us today!
      </p>
      <RouterLink to="/books" @mouseover="isHovered = true" @mouseleave="isHovered = false">
        <InputButton class="cursor-none">Get Started</InputButton>
      </RouterLink>
    </div>
    <div class="m-8 flex h-64 w-64 justify-center rounded-full bg-white md:min-w-96 md:min-h-96">
      <img src="/bookshelf.png" alt="a stack of books" />
    </div>
    <div
      v-if="y > 56"
      :class="`absolute w-4 h-4 rounded-full transparent-white pointer-events-none transition-scale ${isHovered ? 'scale-up' : ''}`"
      :style="{ left: `${x}px`, top: `${y}px`, transform: `translate(-50%, -50%)` }"
    ></div>
  </main>
</template>

<style scoped>
.transparent-white {
  background-color: rgba(255, 255, 255, 0.4);
}

.scale-up {
  scale: 3;
  background-color: rgba(255, 255, 255, 0.7);
}

.transition-scale {
  transition: scale 0.2s ease-out, background-color 0.2s ease-out;
  transform-origin: 0 0;
}
</style>
