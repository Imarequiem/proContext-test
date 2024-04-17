<template>
  <input
    class="input-count"
    type="number"
    :min="props?.min"
    v-model="count"
  />
</template>

<script setup lang="ts">
const count = defineModel()
const props = defineProps({
  min: Number || String,
})
</script>

<style scoped lang="scss">
@import url('src/styles/components/UI/InputCount.scss');
</style>