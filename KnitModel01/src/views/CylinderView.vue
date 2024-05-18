<script setup>
import cylinderPart from '@/components/cylinder/cylinderPart.vue'
</script>

<template>
  <div class="outside">
    <h1>Cylinder</h1>
    <cylinderPart />
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
