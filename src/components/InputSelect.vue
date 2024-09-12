<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[]
}
const props = defineProps<Props>()
const model = defineModel()
</script>

<template>
  <label :for="props.id">{{ props.label }}</label>
  <select v-model="model" :id="props.id" class="text-black px-4 py-2">
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
  </select>
</template>