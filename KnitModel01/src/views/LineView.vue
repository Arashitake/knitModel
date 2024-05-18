<script setup>
import DogTest from '@/components/Line/DogTest.vue'
</script>

<template>
  <div class="outside">
    <h1>This is an about page</h1>
    <DogTest />
  </div>
</template>

<style>
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
