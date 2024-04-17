<template>
  <input
    class="input-color"
    type="color"
    v-model="color"
  />
</template>

<script setup lang="ts">
const color = defineModel()
</script>

<style scoped lang="scss">
@import url('src/styles/components/UI/InputColor.scss');
</style>