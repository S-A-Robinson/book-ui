<script setup lang="ts">
interface Props {
  id: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[],
}
const props = defineProps<Props>()
const model = defineModel()
</script>

<template>
  <div class="flex flex-col items-start">
    <label class="ml-2" v-if="label" :for="props.id">{{ props.label }}</label>
    <select v-model="model" :id="props.id" class="bg-slate-800 text-white h-10 px-4 py-2 w-full rounded hover:bg-slate-600">
      <option v-for="option in options" :key="option.value" :value="option.value" @change="$emit('update:modelValue', option.value)">{{ option.label }}</option>
    </select>
  </div>
</template>