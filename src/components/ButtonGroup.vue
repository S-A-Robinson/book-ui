<script setup lang="ts">
interface Props {
  buttons: {
    id: string;
    label: string;
    clickHandler();
  }[]
}
const props = defineProps<Props>();
</script>

<template>
  <div class="flex items-center divide-x divide-white">
    <button v-for="button in props.buttons" :key="button.id" class="px-4 text-center" @click="button.clickHandler">{{ button.label }}</button>
  </div>
</template>