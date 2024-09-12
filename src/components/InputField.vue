<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  placeholder: string;
  type: string;
}
const props = defineProps<Props>()
const model = defineModel()
</script>

<template>
  <label :for="props.id">{{ props.label }}</label>
  <input
    v-model="model"
    :id="props.id"
    :type="props.type"
    :placeholder="props.placeholder"
    class="text-black"
  />
</template>