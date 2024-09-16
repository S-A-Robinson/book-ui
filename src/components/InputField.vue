<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  error?: string;
}
const props = defineProps<Props>()
const model = defineModel()
</script>

<template>
  <label v-if="label" :for="props.id">{{ props.label }}</label>
  <input
    v-model="model"
    :id="props.id"
    :type="props.type"
    :placeholder="props.placeholder"
    class="text-black px-4 py-2"
  />
  <span v-if="props.error" class="text-red-600">{{ props.error }}</span>
</template>