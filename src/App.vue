
<template>
  <main>
    <left-side />
    <right-side />
  </main>
</template>

<script setup lang="ts">
import LeftSide from './components/LeftSide.vue'
import RightSide from './components/RightSide.vue';
</script>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px
}
</style>
