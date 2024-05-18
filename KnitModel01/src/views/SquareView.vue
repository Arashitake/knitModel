<script setup>
import squarePart from '@/components/square/squarePart.vue'
</script>

<template>
  <div class="outside">
    <h1>Square</h1>
    <squarePart />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .outside {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
