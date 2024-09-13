<script setup lang="ts">

</script>

<template>
  <div class="flex items-center divide-x divide-white">
    <button class="px-4 text-center" @click="$emit('filterStatus')">All</button>
    <button class="px-4 text-center" @click="$emit('filterStatus', 'Read')">Read</button>
    <button class="px-4 text-center" @click="$emit('filterStatus', 'Reading')">Reading</button>
    <button class="px-4 text-nowrap" @click="$emit('filterStatus', 'Plan To Read')">Plan To Read</button>
  </div>
</template>