<script setup lang="ts">
defineProps<{
  label?: string
  clickEvent?: string
}>()
</script>

<template>
  <button
    class="bg-slate-800 w-fit h-10 px-4 py-2 rounded text-nowrap hover:bg-slate-600"
    @click="clickEvent ? $emit(clickEvent) : null"
  >
    <slot>
      {{ label }}
    </slot>
  </button>
</template>